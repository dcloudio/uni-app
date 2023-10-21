<template>
  <div
    class="uni-async-error"
    @click="_onClick"
  >
    {{ $$t("uni.async.error") }}
  </div>
</template>
<style>
	.uni-async-error {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		color: #999;
		padding: 100px 10px;
		text-align: center;
	}
</style>
<script>
import {
  i18nMixin
} from 'uni-core/helpers/i18n'

export default {
  name: 'AsyncError',
  mixins: [i18nMixin],
  methods: {
    _onClick () {
      // TODO 临时采用 reload
      window.location.reload()
    }
  }
}
</script>
