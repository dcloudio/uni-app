import path from 'path'
import type { ResolvedId } from 'rollup'
import { normalizePath } from '../src/utils'
import { findUsingComponents } from '../src/json/mp/jsonFile'
import { parseProgram } from '../src/mp/ast'
import {
  parseMainDescriptor,
  transformDynamicImports,
  updateMiniProgramComponentsByMainFilename,
  updateMiniProgramGlobalComponents,
} from '../src/mp/usingComponents'
const inputDir = normalizePath(path.resolve('/usr/xxx/projects/test/src'))

function normalizeComponentName(name: string) {
  return name
}
async function resolve(id: string, importer?: string) {
  return {
    id: normalizePath(importer ? path.resolve(path.dirname(importer), id) : id),
  } as ResolvedId
}

function dynamicImport(name: string, source: string) {
  return `const ${name} = ()=>import('${source}')`
}

describe('transformVueComponentImports', () => {
  let oldInputDir = process.env.UNI_INPUT_DIR

  afterAll(() => {
    process.env.UNI_INPUT_DIR = oldInputDir
  })
  describe('global', () => {
    const filename = '/usr/xxx/projects/test/src/main.js'
    process.env.UNI_INPUT_DIR = '/usr/xxx/projects/test/src'
    test(`basic`, async () => {
      const source = `
import { createSSRApp } from 'vue'
import App from './App.vue'
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
      const { imports } = await updateMiniProgramGlobalComponents(
        filename,
        parseProgram(source, filename, {}),
        {
          inputDir,
          resolve,
          normalizeComponentName,
        }
      )

      expect(findUsingComponents('app')).toMatchObject({
        'component-a': '/components/component-a',
        'component-b': '/components/component-b',
      })
      expect(imports.length).toBe(2)
      const { code } = await transformDynamicImports(source, imports, {
        dynamicImport,
      })
      expect(code).toContain(`import App from './App.vue'`)
      expect(code).toContain(
        `const ComponentA = ()=>import('${inputDir}/components/component-a.vue')`
      )
      expect(code).toContain(
        `const ComponentB = ()=>import('${inputDir}/components/component-b.vue')`
      )
    })
    test(`ts`, async () => {
      const source = `
import { createSSRApp } from 'vue'
import App from './App.vue'
import ComponentA from './components/component-a.vue'
import ComponentB from './components/component-b.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.provide('UseRequestConfigContext', {
    requestMethod: (param: any) => {},
  })
  app.component('component-a',ComponentA)
  app.component('component-b',ComponentB)
  return {
    app
  }
}
`
      const tsFilename = filename.replace('.js', '.ts')
      const { imports } = await updateMiniProgramGlobalComponents(
        tsFilename,
        parseProgram(source, tsFilename, {}),
        {
          inputDir,
          resolve,
          normalizeComponentName,
        }
      )

      expect(findUsingComponents('app')).toMatchObject({
        'component-a': '/components/component-a',
        'component-b': '/components/component-b',
      })
      expect(imports.length).toBe(2)
      const { code } = await transformDynamicImports(source, imports, {
        dynamicImport,
      })
      expect(code).toContain(`import App from './App.vue'`)
      expect(code).toContain(
        `const ComponentA = ()=>import('${inputDir}/components/component-a.vue')`
      )
      expect(code).toContain(
        `const ComponentB = ()=>import('${inputDir}/components/component-b.vue')`
      )
    })
  })
  describe('local', () => {
    const filename = '/usr/xxx/projects/test/src/pages/index/index.vue'

    async function testLocal(
      source: string,
      usingComponents: Record<string, string>,
      code: string
    ) {
      const ast = parseProgram(source, filename, {})
      const { imports } = await parseMainDescriptor(filename, ast, resolve)
      updateMiniProgramComponentsByMainFilename(
        filename,
        inputDir,
        normalizeComponentName
      )
      expect(findUsingComponents('pages/index/index')).toMatchObject(
        usingComponents
      )
      expect(
        (await transformDynamicImports(source, imports, { dynamicImport })).code
      ).toContain(code)
    }

    test(`basic`, async () => {
      await testLocal(
        `import test1 from "${inputDir}/components/test1.vue";
      const _sfc_main = {
        components: {
          test1
        }
      };
      const __BINDING_COMPONENTS__ = '{"test1":{"name":"_component_test1","type":"unknown"}}';
      function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        return {};
      }
      import "${filename}?vue&type=style&index=0&lang.css";
      import _export_sfc from "plugin-vue:export-helper";
      export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  `,
        {
          test1: '/components/test1',
        },
        `const test1 = ()=>import('${inputDir}/components/test1.vue')`
      )
    })

    test(`easycom`, async () => {
      await testLocal(
        `import test1 from "../../components/test1.vue";
        import MyComponentName from "../../components/test1.vue";
        const _sfc_main = {
          components: {
            test1,
            MyComponentName
          }
        };
        const __BINDING_COMPONENTS__ = '{"test":{"name":"_easycom_test","type":"unknown"},"test1":{"name":"_component_test1","type":"unknown"},"MyComponentName":{"name":"_component_MyComponentName","type":"unknown"},"my-component-name":{"name":"_component_my_component_name","type":"unknown"}}';
        import _easycom_test from "${inputDir}/components/test/test.vue";
        if (!Math) {
          (_easycom_test)();
        }
        function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
          return {};
        }
        import "${inputDir}/pages/index/index.vue?vue&type=style&index=0&lang.css";
        import _export_sfc from "plugin-vue:export-helper";
        export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
    `,
        {
          test: '/components/test/test',
          test1: '/components/test1',
          'my-component-name': '/components/test1',
        },
        `const _easycom_test = ()=>import('${inputDir}/components/test/test.vue')`
      )
    })

    test(`unplugin-vue-components`, async () => {
      await testLocal(
        `import { ref, watch } from 'vue';/* unplugin-vue-components disabled */import __unplugin_components_0 from '${inputDir}/components/test1.vue';
        const _sfc_main = {
          setup() {
            const visible = ref(false);
            watch(visible, () => {
              console.log("parent visible change");
            });
            return {
              visible
            };
          }
        };
        import { o as _o, resolveComponent as _resolveComponent, p as _p } from "vue";
        const __BINDING_COMPONENTS__ = '{"Test1":{"name":"_component_Test","type":"unknown"}}';
        if (!Array) {const _component_Test = __unplugin_components_0;Math.max.call(null, _component_Test);}
        function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
          return {};
        }
        import _export_sfc from "plugin-vue:export-helper";
        export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
    `,
        {
          test1: '/components/test1',
        },
        `const __unplugin_components_0 = ()=>import('${inputDir}/components/test1.vue')`
      )
    })

    test(`PascalCase`, async () => {
      await testLocal(
        `import test1 from "../../components/test1.vue";
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
        import "${inputDir}/pages/index/index.vue?vue&type=style&index=0&lang.css";
        import _export_sfc from "plugin-vue:export-helper";
        export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
    `,
        {
          test1: '/components/test1',
          'my-component-name': '/components/test1',
        },
        `const MyComponentName = ()=>import('${inputDir}/components/test1.vue')`
      )
    })

    test(`setup`, async () => {
      await testLocal(
        `import { defineComponent as _defineComponent } from "vue";
        const __BINDING_COMPONENTS__ = '{"test1":{"name":"test1","type":"setup"},"MyComponentName":{"name":"MyComponentName","type":"setup"},"my-component-name":{"name":"MyComponentName","type":"setup"}}';
        if (!Math) {
          (test1+MyComponentName+MyComponentName)();
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
        import "${inputDir}/pages/index/index.vue?vue&type=style&index=0&lang.css";
        export default _sfc_main;
    `,
        {
          test1: '/components/test1',
          'my-component-name': '/components/test1',
        },
        `const MyComponentName = ()=>import('${inputDir}/components/test1.vue')`
      )
    })
    test(`setup with easycom`, async () => {
      await testLocal(
        `import { defineComponent as _defineComponent } from "vue";
        const __BINDING_COMPONENTS__ = '{"test":{"name":"_easycom_test","type":"unknown"},"test1":{"name":"test1","type":"setup"},"MyComponentName":{"name":"MyComponentName","type":"setup"},"my-component-name":{"name":"MyComponentName","type":"setup"}}';
        import _easycom_test from "${inputDir}/components/test/test.vue";
        if (!Math) {
          (_easycom_test+test1+MyComponentName+MyComponentName)();
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
        import "${inputDir}/pages/index/index.vue?vue&type=style&index=0&lang.css";
        export default _sfc_main;
    `,
        {
          test: '/components/test/test',
          test1: '/components/test1',
          'my-component-name': '/components/test1',
        },
        `const _easycom_test = ()=>import('${inputDir}/components/test/test.vue')`
      )
    })
  })
})
