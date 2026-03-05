import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
VantComponent({
    props: {
        dot: Boolean,
        info: null,
        size: {
            type: null,
            observer: 'setSizeWithUnit'
        },
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        },
        name: {
            type: String,
            observer(val) {
                this.setData({
                    isImageName: val.indexOf('/') !== -1
                });
            }
        }
    },
    data: {
        sizeWithUnit: null,
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
        setSizeWithUnit(size) {
            this.setData({
                sizeWithUnit: addUnit(size)
            });
        }
    }
});
