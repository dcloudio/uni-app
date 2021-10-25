import path from 'path'
import { ResolvedId } from 'rollup'
import { transformVueComponentImports } from '../src/mp/transformImports'
const root = '/usr/xxx/projects/test/src'

async function resolve(id: string, importer?: string) {
  return {
    id: importer ? path.resolve(path.dirname(importer), id) : id,
  } as ResolvedId
}

function dynamicImport(name: string, source: string) {
  return `const ${name} = ()=>import('${source}')`
}

describe('transformVueComponentImports', () => {
  describe('global', () => {
    const importer = '/usr/xxx/projects/test/src/main.js'
    test(`basic`, async () => {
      const source = `
import { createSSRApp } from 'vue'
import ComponentA from './components/component-a.vue'
import ComponentB from './components/component-b.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('component-a',ComponentA)
  app.component('component-b',ComponentB)
  return {
    app
  }
}
`
      const { code, usingComponents } = await transformVueComponentImports(
        source,
        importer,
        {
          root,
          global: true,
          resolve,
          dynamicImport,
        }
      )
      expect(code).toContain(
        `const ComponentA = ()=>import('${root}/components/component-a.vue')`
      )
      expect(code).toContain(
        `const ComponentB = ()=>import('${root}/components/component-b.vue')`
      )
      expect(usingComponents).toMatchObject({
        'component-a': '/components/component-a',
        'component-b': '/components/component-b',
      })
    })
  })
  describe('local', () => {
    const importer = '/usr/xxx/projects/test/src/pages/index/index.vue'
    test(`basic`, async () => {
      const source = `import test1 from "${root}/components/test1.vue";
      const _sfc_main = {
        components: {
          test1
        }
      };
      const __BINDING_COMPONENTS__ = '{"test1":{"name":"_component_test1","type":"unknown"}}';
      function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        return {};
      }
      import "${importer}?vue&type=style&index=0&lang.css";
      import _export_sfc from "plugin-vue:export-helper";
      export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  `
      const { code, usingComponents } = await transformVueComponentImports(
        source,
        importer,
        {
          root,
          resolve,
          dynamicImport,
        }
      )
      expect(code).toContain(
        `const test1 = ()=>import('${root}/components/test1.vue')`
      )
      expect(usingComponents).toMatchObject({ test1: '/components/test1' })
    })

    test(`easycom`, async () => {
      const source = `import test1 from "../../components/test1.vue";
      import MyComponentName from "../../components/test1.vue";
      const _sfc_main = {
        components: {
          test1,
          MyComponentName
        }
      };
      const __BINDING_COMPONENTS__ = '{"test":{"name":"_easycom_test","type":"unknown"},"test1":{"name":"_component_test1","type":"unknown"},"MyComponentName":{"name":"_component_MyComponentName","type":"unknown"},"my-component-name":{"name":"_component_my_component_name","type":"unknown"}}';
      import _easycom_test from "${root}/components/test/test.vue";
      if (!Math) {
        Math.max.call(Max, _easycom_test);
      }
      function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        return {};
      }
      import "${root}/pages/index/index.vue?vue&type=style&index=0&lang.css";
      import _export_sfc from "plugin-vue:export-helper";
      export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  `
      const { code, usingComponents } = await transformVueComponentImports(
        source,
        importer,
        {
          root,
          resolve,
          dynamicImport,
        }
      )
      expect(code).toContain(
        `const _easycom_test = ()=>import('${root}/components/test/test.vue')`
      )
      expect(usingComponents).toMatchObject({
        test: '/components/test/test',
        test1: '/components/test1',
        'my-component-name': '/components/test1',
      })
    })

    test(`PascalCase`, async () => {
      const source = `import test1 from "../../components/test1.vue";
      import MyComponentName from "../../components/test1.vue";
      const _sfc_main = {
        components: {
          test1,
          MyComponentName
        }
      };
      const __BINDING_COMPONENTS__ = '{"test1":{"name":"_component_test1","type":"unknown"},"MyComponentName":{"name":"_component_MyComponentName","type":"unknown"},"my-component-name":{"name":"_component_my_component_name","type":"unknown"}}';
      function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        return {};
      }
      import "${root}/pages/index/index.vue?vue&type=style&index=0&lang.css";
      import _export_sfc from "plugin-vue:export-helper";
      export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  `
      const { code, usingComponents } = await transformVueComponentImports(
        source,
        importer,
        {
          root,
          resolve,
          dynamicImport,
        }
      )
      expect(code).toContain(
        `const MyComponentName = ()=>import('${root}/components/test1.vue')`
      )
      expect(usingComponents).toMatchObject({
        test1: '/components/test1',
        'my-component-name': '/components/test1',
      })
    })

    test(`setup`, async () => {
      const source = `import { defineComponent as _defineComponent } from "vue";
      const __BINDING_COMPONENTS__ = '{"test1":{"name":"test1","type":"setup"},"MyComponentName":{"name":"MyComponentName","type":"setup"},"my-component-name":{"name":"MyComponentName","type":"setup"}}';
      if (!Math) {
        Math.max.call(Max, test1, MyComponentName, MyComponentName);
      }
      import test1 from "../../components/test1.vue";
      import MyComponentName from "../../components/test1.vue";
      const _sfc_main = /* @__PURE__ */ _defineComponent({
        setup(__props) {
          return (_ctx, _cache) => {
            return {};
          };
        }
      });
      import "${root}/pages/index/index.vue?vue&type=style&index=0&lang.css";
      export default _sfc_main;
  `
      const { code, usingComponents } = await transformVueComponentImports(
        source,
        importer,
        {
          root,
          resolve,
          dynamicImport,
        }
      )
      expect(code).toContain(
        `const MyComponentName = ()=>import('${root}/components/test1.vue')`
      )
      expect(usingComponents).toMatchObject({
        test1: '/components/test1',
        'my-component-name': '/components/test1',
      })
    })
    test(`setup with easycom`, async () => {
      const source = `import { defineComponent as _defineComponent } from "vue";
      const __BINDING_COMPONENTS__ = '{"test":{"name":"_easycom_test","type":"unknown"},"test1":{"name":"test1","type":"setup"},"MyComponentName":{"name":"MyComponentName","type":"setup"},"my-component-name":{"name":"MyComponentName","type":"setup"}}';
      import _easycom_test from "${root}/components/test/test.vue";
      if (!Math) {
        Math.max.call(Max, _easycom_test, test1, MyComponentName, MyComponentName);
      }
      import test1 from "../../components/test1.vue";
      import MyComponentName from "../../components/test1.vue";
      const _sfc_main = /* @__PURE__ */ _defineComponent({
        setup(__props) {
          return (_ctx, _cache) => {
            return {};
          };
        }
      });
      import "${root}/pages/index/index.vue?vue&type=style&index=0&lang.css";
      export default _sfc_main;
  `
      const { code, usingComponents } = await transformVueComponentImports(
        source,
        importer,
        {
          root,
          resolve,
          dynamicImport,
        }
      )
      expect(code).toContain(
        `const _easycom_test = ()=>import('${root}/components/test/test.vue')`
      )
      expect(usingComponents).toMatchObject({
        test: '/components/test/test',
        test1: '/components/test1',
        'my-component-name': '/components/test1',
      })
    })
  })
})
