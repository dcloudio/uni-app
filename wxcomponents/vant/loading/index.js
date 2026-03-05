import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
VantComponent({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: 'circular'
        },
        size: {
            type: String,
            observer: 'setSizeWithUnit'
        },
        textSize: {
            type: String,
            observer: 'setTextSizeWithUnit'
        }
    },
    methods: {
        setSizeWithUnit(size) {
            this.setData({
                sizeWithUnit: addUnit(size)
            });
        },
        setTextSizeWithUnit(size) {
            this.set({
                textSizeWithUnit: addUnit(size)
            });
        }
    }
});
