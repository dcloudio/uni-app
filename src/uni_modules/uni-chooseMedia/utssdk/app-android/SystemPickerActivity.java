package uts.sdk.modules.DCloudUniMedia;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.text.TextUtils;
import android.view.Window;
import android.view.WindowManager;
import android.widget.RelativeLayout;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.PickVisualMediaRequest;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

public class SystemPickerActivity extends FragmentActivity {

    int activityOrientation = Integer.MAX_VALUE;
    private String docPath;

    private boolean copyToPrivacyPath = false;

    /**
     * 最大限制100个
     */
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new RelativeLayout(this));
        if (getIntent().hasExtra("page_orientation")) {
            activityOrientation = getIntent().getIntExtra("page_orientation", ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            setRequestedOrientation(activityOrientation);
        }
        copyToPrivacyPath = getIntent().getBooleanExtra("copy_privacy_path", false);
        docPath = getIntent().getStringExtra(DOC_PATH);
        int type = getIntent().getIntExtra(SELECT_MODE, PICKER_IMAGE_VIDEO);
        int max = getIntent().getIntExtra(MAX_SELECT_COUNT, DEFAULT_SELECTED_MAX_COUNT);
        try {
            if (max > MediaStore.getPickImagesMaxLimit()) {
                max = MediaStore.getPickImagesMaxLimit();
            }
        } catch (Throwable e) {
            if (max > 100) {
                max = 100;
            }
        }
        ActivityResultContracts.PickVisualMedia.VisualMediaType pickVisualMedia = null;
        switch (type) {
            case PICKER_IMAGE_VIDEO:
                pickVisualMedia = ActivityResultContracts.PickVisualMedia.ImageAndVideo.INSTANCE;
                break;
            case PICKER_IMAGE:
                pickVisualMedia = ActivityResultContracts.PickVisualMedia.ImageOnly.INSTANCE;
                break;
            case PICKER_VIDEO:
                pickVisualMedia = ActivityResultContracts.PickVisualMedia.VideoOnly.INSTANCE;
                break;
        }
        ActivityResultLauncher<PickVisualMediaRequest> request = null;
        if (max == 1) {
            request = this.registerForActivityResult(new ActivityResultContracts.PickVisualMedia(), o -> {
                if (o == null) {
                    setResult(RESULT_CANCELED);
                    finish();
                } else {
                    onChooseFinish(o);
                }
            });
        } else if (max > 1) {
            request = this.registerForActivityResult(new ActivityResultContracts.PickMultipleVisualMedia(max), o -> {
                if (o != null && !o.isEmpty()) {
                    onChooseFinish(o.toArray(new Uri[0]));
                } else {
                    setResult(RESULT_CANCELED);
                    finish();
                }
            });
        }
        if (request != null && pickVisualMedia != null) {
            request.launch(new PickVisualMediaRequest.Builder().setMediaType(pickVisualMedia).build());
        } else {
            this.setResult(RESULT_CANCELED);
            finish();
        }
    }

    private void onChooseFinish(Uri... uris) {
        if (uris != null && uris.length > 0) {
            setTopAndBottomBarColor();
            ArrayList<Media> paths = new ArrayList<>();
            compress(Arrays.asList(uris).iterator(), paths);
        } else {
            setResult(RESULT_CANCELED);
            finish();
        }
    }

    private void compress(Iterator<Uri> iterator, ArrayList<Media> medias) {
        while (iterator.hasNext()) {
            Uri uri = iterator.next();
            this.getContentResolver().takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
            String type = SystemPickerActivity.this.getContentResolver().getType(uri);
            String fromPath;
            if (copyToPrivacyPath && type != null && type.startsWith("image/")) {
                String fileName = getFileName(uri);
                String toPath = docPath + System.currentTimeMillis() + "_" + fileName;
                if (copyFile(uri, toPath, this)) {
                    fromPath = toPath;
                } else {
                    fromPath = uri.toString();
                }
            } else {
                fromPath = uri.toString();
            }
            medias.add(makeMedia(fromPath));
        }
        runOnUiThread(() -> {
            Intent intent = new Intent();
            intent.putExtra("select_result", medias);
            setResult(RESULT_OK, intent);
            finish();
        });

    }

    private Media makeMedia(String path) {
        final Media mMedia;
        mMedia = new Media(path, "name", System.currentTimeMillis(), 0, 0, -1, "");
        ArrayList<Media> medias = new ArrayList<>();
        medias.add(mMedia);
        return mMedia;
    }

    private void setTopAndBottomBarColor() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = this.getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.parseColor("#99000000"));
            window.setNavigationBarColor(Color.parseColor("#99000000"));
        }
    }

    @Override
    public void finish() {
        super.finish();
        overridePendingTransition(0, 0);
    }

    private String getFileName(Uri uri) {
        String result = null;
        if (!TextUtils.isEmpty(uri.getScheme()) && uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    int index = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                    if (!cursor.isNull(index)) {
                        result = cursor.getString(index);
                    }
                }
            } catch (Exception ignored) {
            } finally {
                if (cursor != null)
                    cursor.close();
            }
        }
        if (TextUtils.isEmpty(result)) {
            String type = SystemPickerActivity.this.getContentResolver().getType(uri);
            String extension = "";
            if (TextUtils.isEmpty(type)) {
                extension = "jpg";
            } else {
                extension = type.substring(type.indexOf("/") + 1);
            }
            result = System.currentTimeMillis() + "." + extension;
        }
        return result;
    }


    /**
     * 最大图片选择次数，int类型，默认无穷大
     */
    public static final String MAX_SELECT_COUNT = "max_select_count";

    public static final int DEFAULT_SELECTED_MAX_COUNT = Integer.MAX_VALUE;

    /**
     * 图片选择模式，默认选视频和图片
     */
    public static final String SELECT_MODE = "select_mode";

    public static final String DOC_PATH = "doc_path";
    public static final int PICKER_IMAGE = 100;
    public static final int PICKER_VIDEO = 102;
    public static final int PICKER_IMAGE_VIDEO = 101;

    public boolean copyFile(Uri from, String to, Context context) {
        try {
            File toFile = new File(to);
            if (!toFile.exists()) {
                if (!toFile.getParentFile().exists()) {
                    toFile.getParentFile().mkdirs();
                }
                if (toFile.exists())
                    toFile.createNewFile();
            }
            InputStream fis = context.getContentResolver().openInputStream(from);
            FileOutputStream fos = new FileOutputStream(to);
            byte[] buffer = new byte[1024];
            int len;
            while ((len = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, len);
            }
            fis.close();
            fos.close();
            return true;
        } catch (Exception e) {
        }
        return false;
    }
}
