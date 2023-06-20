const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', options = {}, mpOptions = {}) {
  const res = compiler.compile(template, Object.assign({
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-weixin'
    }, mpOptions)
  }, options))

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-extra', () => {
  it('generate mp filter ', () => {
    assertCodegen(
      /* eslint-disable no-template-curly-in-string */
      '<view @touchmove="a.touchmove">{{t.a}}{{t[\'a\']}}{{t.a(b)}}{{t[\'a\'](b)}}{{u.t.a(b)}}{{u.t.a}}</view>',
      '<view bindtouchmove="{{a.touchmove}}">{{t.a+t[\'a\']+t.a(b)+t[\'a\'](b)+$root.g0+u.t.a}}</view>',
      'with(this){var g0=u.t.a(b);$mp.data=Object.assign({},{$root:{g0:g0}})}', {
        filterModules: {
          t: {},
          a: {}
        }
      }
    )
    assertCodegen(
      /* eslint-disable no-template-curly-in-string */
      '<view v-for="(item, index) in a.test()" :key="index">{{item}}</view>',
      '<block wx:for="{{a.test()}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view>{{item}}</view></block>',
      'with(this){}', {
        filterModules: {
          t: {},
          a: {}
        }
      }
    )
  })

  it('generate scopeId', () => {
    assertCodegen(
      '<view></view>',
      '<view class="data-v-1"></view>',
      undefined, {
        scopeId: 'data-v-1'
      }
    )
    assertCodegen(
      '<view class="view"></view>',
      '<view class="view data-v-2"></view>',
      undefined, {
        scopeId: 'data-v-2'
      }
    )
    assertCodegen(
      '<view :class="[{ active: isActive }, errorClass]"></view>',
      '<view class="{{[\'data-v-3\',[(isActive)?\'active\':\'\'],errorClass]}}"></view>',
      undefined, {
        scopeId: 'data-v-3'
      }
    )
    assertCodegen(
      '<view class="static" :class="[{ active: isActive }, errorClass]"></view>',
      '<view class="{{[\'static\',\'data-v-4\',[(isActive)?\'active\':\'\'],errorClass]}}"></view>',
      undefined, {
        scopeId: 'data-v-4'
      }
    )
    assertCodegen(
      '<view ref="ref" :class="[{ active: isActive }, errorClass]"></view>',
      '<view data-ref="ref" class="{{[\'data-v-5\',\'vue-ref\',[(isActive)?\'active\':\'\'],errorClass]}}"></view>',
      undefined, {
        scopeId: 'data-v-5'
      }
    )
    assertCodegen(
      '<view :class="view"></view>',
      '<view class="{{[\'data-v-6\',view]}}"></view>',
      undefined, {
        scopeId: 'data-v-6'
      }
    )
    //     assertCodegen(
    //       '<view :class="view"></view>',
    //       `<view class="{{$root.c0}}"></view>`,
    //       `with(this){var c0=__get_class(view,"data-v-6");$mp.data=Object.assign({},{$root:{c0:c0}})}`, {
    //         scopeId: 'data-v-6'
    //       }
    //     )
    assertCodegen(
      '<view :class="view" class="view"></view>',
      '<view class="{{[\'view\',\'data-v-7\',view]}}"></view>',
      undefined, {
        scopeId: 'data-v-7'
      }
    )
    //         assertCodegen(
    //             '<view :class="view" class="view"></view>',
    //             `<view class="{{$root.c0}}"></view>`,
    //             `with(this){var c0=__get_class(view,"view data-v-7");$mp.data=Object.assign({},{$root:{c0:c0}})}`, {
    //                 scopeId: 'data-v-7'
    //             }
    //         )
  })

  it('generate staticStyle upx and px', () => {
    assertCodegen(
      '<view style="height:100upx;width:100upx;">text</view>',
      '<view style="height:100rpx;width:100rpx;">text</view>'
    )
    assertCodegen(
      '<view style="height:100upx;width:100rpx;">text</view>',
      '<view style="height:100rpx;width:100rpx;">text</view>'
    )
    assertCodegen(
      '<view style="height:100px;width:100px;">text</view>',
      '<view style="height:100px;width:100px;">text</view>'
    )
    assertCodegen(
      '<view style="height:100px;width:100px;">text</view>',
      '<view style="height:100rpx;width:100rpx;">text</view>',
      undefined,
      undefined, {
        transformPx: true
      }
    )
  })

  it('generate text trim', () => {
    assertCodegen(
      '<view>text</view>',
      '<view>text</view>'
    )

    assertCodegen(
      '<view> text </view>',
      '<view>text</view>'
    )

    assertCodegen(
      '<text>{{line_one_cn+\' \'}}</text>',
      '<text>{{line_one_cn+\' \'}}</text>'
    )

    assertCodegen(
      '<text>{{" "+line_one_cn}}</text>',
      '<text>{{" "+line_one_cn}}</text>'
    )

    assertCodegen(
      '<text>\nN: {{title}}\n′</text>',
      '<text>{{\'N: \'+title+"\\n′"}}</text>'
    )
    assertCodegen(
      '<text>我是第一行\n我的第二行</text>',
      '<text>我是第一行\n我的第二行</text>'
    )
    assertCodegen(
      '<text>我是第一行\n我的第二行1{{title}}</text>',
      '<text>{{"我是第一行\\n我的第二行1"+title}}</text>'
    )
    assertCodegen(
      `<text>我是第一行
我的第二行2{{title}}</text>`,
      '<text>{{"我是第一行\\n我的第二行2"+title}}</text>'
    )

    assertCodegen(
      '<view> text text </view>',
      '<view>text text</view>'
    )
    assertCodegen(
      '<view>text {{text}} text</view>',
      '<view>{{"text "+text+" text"}}</view>'
    )
    //         assertCodegen(
    //             '<view>text {{text}} \ntext</view>',
    //             `<view>{{"text " + text + " \ntext"}}</view>`
    //         )
    assertCodegen(
      '<view> text {{text}} 文本 </view>',
      '<view>{{\'text \'+text+\' 文本\'}}</view>'
    )
    assertCodegen(
      '<view>{{text}} text  text </view>',
      '<view>{{text+\' text  text\'}}</view>'
    )
    assertCodegen(
      '<view>  {{text}} text  text </view>',
      '<view>{{\'\'+text+\' text  text\'}}</view>'
    )
    assertCodegen(
      '<view>{{text}} text  text {{text}}</view>',
      '<view>{{text+" text  text "+text}}</view>'
    )
    assertCodegen(
      '<view>  {{text}} text  text {{text}}  </view>',
      '<view>{{\'\'+text+" text  text "+text+\'\'}}</view>'
    )
  })

  it('generate default slot', () => {
    assertCodegen(
      '<component1>text</component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}">text</component1>'
    )
    assertCodegen(
      '<component1>text<text>123213</text></component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}">text<text>123213</text></component1>'
    )
    assertCodegen(
      '<component1>text<block slot="right"></block></component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\',\'right\']}}">text<view slot="right"></view></component1>'
    )
  })

  it('generate input value', () => {
    assertCodegen(
      '<input type="text" value="" />',
      '<input type="text" value=""/>'
    )
  })

  it('generate v-slot', () => {
    assertCodegen(
      '<view><template></template></view>',
      '<view></view>'
    )

    assertCodegen(
      '<component1><template slot="f">f</template><template slot="c">c</template>默认</component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\',\'f\',\'c\']}}"><view slot="f">f</view><view slot="c">c</view>默认</component1>'
    )

    assertCodegen(
      '<component1 v-slot>text</component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block>text</block></component1>'
    )

    assertCodegen(
      '<component1 v-slot:default>text<text>123213</text></component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block>text<text>123213</text></block></component1>'
    )
    assertCodegen(
      '<component1><template v-slot:left><text></text></template><template v-slot:right><text></text></template></component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'left\',\'right\']}}"><text slot="left"></text><text slot="right"></text></component1>'
    )
    assertCodegen(
      '<component1><view>view1</view><view>view2</view></component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><view>view1</view><view>view2</view></component1>'
    )
    assertCodegen(
      '<component1><template v-slot><view>view1</view><view>view2</view><template></component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block><view>view1</view><view>view2</view></block></component1>'
    )
    assertCodegen(
      '<component1><template v-slot:test><view>view1</view><view>view2</view><template></component1>',
      '<component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'test\']}}"><view slot="test"><view>view1</view><view>view2</view></view></component1>'
    )
    assertCodegen(
      `<my-component>
       <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <p>A paragraph for the main content.</p>
      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
    </my-component>`,
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\',\'header\',\'footer\']}}"><view class="_h1" slot="header">Here might be a page title</view><view class="_p" slot="footer">Here\'s some contact info</view><view class="_p">A paragraph for the main content.</view></my-component>'
    )
  })

  it('generate v-slot with v-if', () => {
    assertCodegen(
      '<custom-view><template v-if="show">hello</template></custom-view>',
      '<custom-view vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{show}}">hello</block></custom-view>'
    )
    assertCodegen(
      '<custom-view><template v-if="show" #name>hello</template></custom-view>',
      '<custom-view vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'name\']}}"><text slot="name" wx:if="{{show}}">hello</text></custom-view>'
    )
    assertCodegen(
      '<custom-view><template v-if="show" #name><text>hello</text></template></custom-view>',
      '<custom-view vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'name\']}}"><text slot="name" wx:if="{{show}}">hello</text></custom-view>'
    )
    assertCodegen(
      '<custom-view><template v-if="show" #name><view>hello</view></template></custom-view>',
      '<custom-view vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'name\']}}"><view slot="name" wx:if="{{show}}">hello</view></custom-view>'
    )
    assertCodegen(
      '<custom-view><template v-if="show" #name><view v-if="test1||test2">hello</view></template></custom-view>',
      '<custom-view vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'name\']}}"><view slot="name" wx:if="{{(show)&&(test1||test2)}}">hello</view></custom-view>'
    )
  })

  it('generate events inside v-for', () => {
    assertCodegen(
      '<view v-for="item in dataList" :key="item.id" @click="click1(item, 1);click2(item, 2);"/>',
      '<block wx:for="{{dataList}}" wx:for-item="item" wx:for-index="__i0__" wx:key="id"><view data-event-opts="{{[[\'tap\',[[\'click1\',[\'$0\',1],[[[\'dataList\',\'id\',item.id]]]],[\'click2\',[\'$0\',2],[[[\'dataList\',\'id\',item.id]]]]]]]}}" bindtap="__e"></view></block>'
    )
    assertCodegen(
      '<custom-view v-for="(item,index) in dataList" @test="test($event, item)"><template v-slot><view>text</view></template></custom-view>',
      '<block wx:for="{{dataList}}" wx:for-item="item" wx:for-index="index"><custom-view bind:test="__e" vue-id="{{\'551070e6-1-\'+index}}" data-event-opts="{{[[\'^test\',[[\'test\',[\'$event\',\'$0\'],[[[\'dataList\',\'\',index]]]]]]]}}" bind:__l="__l" vue-slots="{{[\'default\']}}"><view>text</view></custom-view></block>'
    )
    // TODO vue的数字 item 是从1，小程序是从0，后续考虑抹平差异
    assertCodegen(
      '<view>1<view  v-for="item in items" :key="item"><input v-for="item1 in item" :key="item1" @input="handle" @click="e=>count++"></view></view>',
      '<view>1<block wx:for="{{items}}" wx:for-item="item" wx:for-index="__i0__" wx:key="*this"><view><block wx:for="{{item}}" wx:for-item="item1" wx:for-index="__i1__" wx:key="*this"><input data-event-opts="{{[[\'input\',[[\'handle\',[\'$event\']]]],[\'tap\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e" bindtap="__e"/></block></view></block></view>',
      'with(this){if(!_isMounted){e0=e=>count++}}'
    )
    assertCodegen(
      '<view>2<view  v-for="(item,index) in items" :key="item"><input v-for="(item1,index1) in item" :key="item1" @input="handle" @click="e=>count++"></view></view>',
      '<view>2<block wx:for="{{items}}" wx:for-item="item" wx:for-index="index" wx:key="*this"><view><block wx:for="{{item}}" wx:for-item="item1" wx:for-index="index1" wx:key="*this"><input data-event-opts="{{[[\'input\',[[\'handle\',[\'$event\']]]],[\'tap\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e" bindtap="__e"/></block></view></block></view>',
      'with(this){if(!_isMounted){e0=e=>count++}}'
    )
    assertCodegen(
      '<view v-for="item in data.items" @tap="change(item,item.b,true)">3</view>',
      '<block wx:for="{{data.items}}" wx:for-item="item" wx:for-index="__i0__"><view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',\'$1\',true],[[[\'data.items\',\'\',__i0__]],[[\'data.items\',\'\',__i0__,\'b\']]]]]]]}}" bindtap="__e">3</view></block>'
    )
    assertCodegen(
      '<view v-for="(item,index) in data.items" @tap="change(item,item.b,true,index)">33</view>',
      '<block wx:for="{{data.items}}" wx:for-item="item" wx:for-index="index"><view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',\'$1\',true,index],[[[\'data.items\',\'\',index]],[[\'data.items\',\'\',index,\'b\']]]]]]]}}" bindtap="__e">33</view></block>'
    )
    assertCodegen(
      '<view v-for="(item,index) in data.items" @tap="change(item,true,index,item.b)">4</view>',
      '<block wx:for="{{data.items}}" wx:for-item="item" wx:for-index="index"><view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',true,index,\'$1\'],[[[\'data.items\',\'\',index]],[[\'data.items\',\'\',index,\'b\']]]]]]]}}" bindtap="__e">4</view></block>'
    )
    assertCodegen(
      '<view v-for="item in data.items" :key="item.id" @tap="change(item,item.b,true)">5</view>',
      '<block wx:for="{{data.items}}" wx:for-item="item" wx:for-index="__i0__" wx:key="id"><view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',\'$1\',true],[[[\'data.items\',\'id\',item.id]],[[\'data.items\',\'id\',item.id,\'b\']]]]]]]}}" bindtap="__e">5</view></block>'
    )
    assertCodegen(
      '<view v-for="item in data.items" :key="item.id" @tap="change(item,item.b,true)">6</view>',
      '<block wx:for="{{data.items}}" wx:for-item="item" wx:for-index="__i0__" wx:key="id"><view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',\'$1\',true],[[[\'data.items\',\'id\',item.id]],[[\'data.items\',\'id\',item.id,\'b\']]]]]]]}}" bindtap="__e">6</view></block>'
    )
    assertCodegen(
      '<view v-for="(item,index) in data.items" :key="item.id" @tap="change(item,item.b,test,true)">7<view v-for="(meta,index) in item.metas" :key="meta.id" @tap="change(meta,meta.b,true)"></view></view>',
      '<block wx:for="{{data.items}}" wx:for-item="item" wx:for-index="index" wx:key="id"><view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',\'$1\',\'$2\',true],[[[\'data.items\',\'id\',item.id]],[[\'data.items\',\'id\',item.id,\'b\']],\'test\']]]]]}}" bindtap="__e">7<block wx:for="{{item.metas}}" wx:for-item="meta" wx:for-index="index" wx:key="id"><view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',\'$1\',true],[[[\'data.items\',\'id\',item.id],[\'metas\',\'id\',meta.id]],[[\'data.items\',\'id\',item.id],[\'metas\',\'id\',meta.id,\'b\']]]]]]]}}" bindtap="__e"></view></block></view></block>'
    )
    assertCodegen(
      `<block v-for="(weeks, week) in canlender.weeks" :key="week">
        <block v-for="(day, index) in weeks" :key="index">,
             <view @tap="selectDays(week,index,canlender.month === day.month,day.disable,canlender.lunar)"></view>
        </block>
    </block>`,
      '<block wx:for="{{canlender.weeks}}" wx:for-item="weeks" wx:for-index="week" wx:key="week"><block><block wx:for="{{weeks}}" wx:for-item="day" wx:for-index="index" wx:key="index"><block>,<view data-event-opts="{{[[\'tap\',[[\'selectDays\',[week,index,canlender.month===day.month,\'$0\',\'$1\'],[[[\'canlender.weeks\',\'\',week],[\'\',\'\',index,\'disable\']],\'canlender.lunar\']]]]]}}" bindtap="__e"></view></block></block></block></block>'
    )
    assertCodegen(
      '<view v-for="item in list">9<input type="text" v-for="meta in item.meta" :key="meta.id" v-model="meta.value"></view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="__i0__"><view>9<block wx:for="{{item.meta}}" wx:for-item="meta" wx:for-index="__i1__" wx:key="id"><input type="text" data-event-opts="{{[[\'input\',[[\'__set_model\',[\'$0\',\'value\',\'$event\',[]],[[[\'list\',\'\',__i0__],[\'meta\',\'id\',meta.id]]]]]]]}}" value="{{meta.value}}" bindinput="__e"/></block></view></block>'
    )
    assertCodegen(
      '<view @click="onSetYear(+1,-1)"></view>',
      '<view data-event-opts="{{[[\'tap\',[[\'onSetYear\',[1,-1]]]]]}}" bindtap="__e"></view>'
    )
    assertCodegen(
      '<view class="input-list" v-for="(item,index) in dataList" :key="item.id"><input v-model.trim="dataList2[index].val" /></view>',
      '<block wx:for="{{dataList}}" wx:for-item="item" wx:for-index="index" wx:key="id"><view class="input-list"><input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'$0\',\'val\',\'$event\',[\'trim\']],[\'dataList2.\'+index+\'\']]]],[\'blur\',[[\'$forceUpdate\']]]]}}" value="{{dataList2[index].val}}" bindinput="__e" bindblur="__e"/></view></block>'
    )
    assertCodegen(
      ` <view>
        <view v-for="item in list[idx]" :key="item.id" class="mid-item-title" @click="m1(item)">
          <view class="mid-item-icon" @click.stop="m2(item)"></view>
        </view>
        </view>`,
      '<view><block wx:for="{{list[idx]}}" wx:for-item="item" wx:for-index="__i0__" wx:key="id"><view data-event-opts="{{[[\'tap\',[[\'m1\',[\'$0\'],[[[\'list.\'+idx+\'\',\'id\',item.id]]]]]]]}}" class="mid-item-title" bindtap="__e"><view data-event-opts="{{[[\'tap\',[[\'m2\',[\'$0\'],[[[\'list.\'+idx+\'\',\'id\',item.id]]]]]]]}}" class="mid-item-icon" catchtap="__e"></view></view></block></view>'
    )
    assertCodegen(
      '<view><view class="item" v-for="i in \'abc\'" :key="i" @click="func(i)"></view></view>',
      '<view><block wx:for="abc" wx:for-item="i" wx:for-index="__i0__" wx:key="*this"><view data-event-opts="{{[[\'tap\',[[\'func\',[\'$0\'],[[[\'#s#abc\',\'\',__i0__]]]]]]]}}" class="item" bindtap="__e"></view></block></view>'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index" @click.stop="func">{{item}}</view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[[\'tap\',[[\'func\',[\'$event\']]]]]}}" catchtap="__e">{{item}}</view></block>'
    )
    assertCodegen(
      '<view v-for="(item,index) in [1,2,3]" :key="index" @click.stop="func">{{item}}</view>',
      '<block wx:for="{{[1,2,3]}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" catchtap="__e">{{item}}</view></block>',
      'with(this){if(!_isMounted){e0=function($event){$event.stopPropagation();return func($event)}}}'
    )
    assertCodegen(
      '<view v-for="(item,index) in array()" :key="index" @click.stop="func">{{item}}</view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" catchtap="__e">{{item}}</view></block>',
      'with(this){var l0=array();if(!_isMounted){e0=function($event){$event.stopPropagation();return func($event)}}$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view><view class="item" v-for="i in 5" :key="i" @click="func(i)"></view></view>',
      '<view><block wx:for="{{5}}" wx:for-item="i" wx:for-index="__i0__" wx:key="*this"><view data-event-opts="{{[[\'tap\',[[\'func\',[\'$0\'],[[[5,\'\',__i0__]]]]]]]}}" class="item" bindtap="__e"></view></block></view>'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view @click="$test.test(item,item.length)"></view></view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item})}}" bindtap="__e"></view></view></block>',
      'with(this){if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;return $test.test(item,item.length)}}}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view @click="$test.test(item,item.length,undefined)"></view></view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item})}}" bindtap="__e"></view></view></block>',
      'with(this){if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;return $test.test(item,item.length,undefined)}}}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view @click="event=>showEventInfo(event,item)"></view></view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item})}}" bindtap="__e"></view></view></block>',
      'with(this){if(!_isMounted){e0=(event,item,...args)=>{var _temp=args[args.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;return showEventInfo(event,item)}}}'
    )
    assertCodegen(
      `
      <view v-for="(value,key,index) in dataObj" :key="index">
        <button @click="click1(index)">click1(index)</button>
        <button @click="fnObj.click(value)">fnObj.click(value)</button>
      </view>
      `,
      '<block wx:for="{{$root.l0}}" wx:for-item="value" wx:for-index="key" wx:key="$index"><view><button data-event-opts="{{[[\'tap\',[[\'click1\',[value.$index]]]]]}}" bindtap="__e">click1(index)</button><button data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({value:value.$orig})}}" bindtap="__e">fnObj.click(value)</button></view></block>',
      'with(this){var l0=__map(dataObj,function(value,key,index){var $orig=__get_orig(value);return{$orig:$orig,$index:index}});if(!_isMounted){e0=function($event,value){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],value=_temp2.value;var _temp,_temp2;return fnObj.click(value)}}$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      `<view v-for="(value,key,index) in obj" :key="key" @click="test(index)">
        <view v-for="(item,key1,index1) in value" :key="key1" @click="test(index1)">text</view>
      </view>`,
      '<block wx:for="{{$root.l1}}" wx:for-item="value" wx:for-index="key" wx:key="key"><view data-event-opts="{{[[\'tap\',[[\'test\',[value.$index]]]]]}}" bindtap="__e"><block wx:for="{{value.l0}}" wx:for-item="item" wx:for-index="key1" wx:key="key1"><view data-event-opts="{{[[\'tap\',[[\'test\',[item.$index]]]]]}}" bindtap="__e">text</view></block></view></block>',
      'with(this){var l1=__map(obj,function(value,key,index){var $orig=__get_orig(value);var l0=__map(value,function(item,key1,index1){var $orig=__get_orig(item);return{$orig:$orig,$index:index1}});return{$orig:$orig,l0:l0,$index:index}});$mp.data=Object.assign({},{$root:{l1:l1}})}'
    )
    assertCodegen(
      `<view v-for="(value,key,index) in obj" :key="key" @click="test(index)">
        <view v-for="(item,index1) in value" :key="key1" @click="test(index1)">text</view>
      </view>`,
      '<block wx:for="{{$root.l0}}" wx:for-item="value" wx:for-index="key" wx:key="key"><view data-event-opts="{{[[\'tap\',[[\'test\',[value.$index]]]]]}}" bindtap="__e"><block wx:for="{{value.$orig}}" wx:for-item="item" wx:for-index="index1" wx:key="*this"><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({index1})}}" bindtap="__e">text</view></block></view></block>',
      'with(this){var l0=__map(obj,function(value,key,index){var $orig=__get_orig(value);return{$orig:$orig,$index:index}});if(!_isMounted){e0=function($event,index1){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],index1=_temp2.index1;var _temp,_temp2;return test(index1)}}$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
  })

  it('generate class binding', () => {
    assertCodegen(
      '<p :class=\'"icon-"+item.icon\'>1</p>',
      '<view class="{{[\'_p\',\'icon-\'+item.icon]}}">1</view>'
    )
    assertCodegen(
      '<div :class="{ active: isActive }">1</div>',
      '<view class="{{[\'_div\',(isActive)?\'active\':\'\']}}">1</view>'
    )
    assertCodegen(
      '<p class="static" :class="{ active: isActive, \'text-danger\': hasError }">2</p>',
      '<view class="{{[\'static\',\'_p\',(isActive)?\'active\':\'\',(hasError)?\'text-danger\':\'\']}}">2</view>'
    )
    assertCodegen(
      '<p class="static" :class="[activeClass, errorClass]">3</p>',
      '<view class="{{[\'static\',\'_p\',activeClass,errorClass]}}">3</view>'
    )
    assertCodegen(
      '<p class="static" :class="[isActive ? activeClass : \'\', errorClass]">4</p>',
      '<view class="{{[\'static\',\'_p\',isActive?activeClass:\'\',errorClass]}}">4</view>'
    )
    assertCodegen(
      '<p class="static" :class="[{ active: isActive }, errorClass]">5</p>',
      '<view class="{{[\'static\',\'_p\',[(isActive)?\'active\':\'\'],errorClass]}}">5</view>'
    )
    assertCodegen(
      '<div class="container" :class="computedClassObject">6</div>',
      '<view class="{{[\'container\',\'_div\',computedClassObject]}}">6</view>'
    )
    //         assertCodegen(
    //             `<div class="container" :class="computedClassObject">6</div>`,
    //             `<view class="{{$root.c0}}">6</view>`,
    //             `with(this){var c0=__get_class(computedClassObject,"container");$mp.data=Object.assign({},{$root:{c0:c0}})}`
    //         )
    assertCodegen(
      '<p :class="index === currentIndex ? activeClass : itemClass">7</p>',
      '<view class="{{[\'_p\',index===currentIndex?activeClass:itemClass]}}">7</view>'
    )
    assertCodegen(
      '<p :class="\'m-content-head-\'+message.user">8</p>',
      '<view class="{{[\'_p\',\'m-content-head-\'+message.user]}}">8</view>'
    )
    assertCodegen(
      '<p :class="classStr1 || classStr2" class="bg">9</p>',
      '<view class="{{[\'bg\',\'_p\',classStr1||classStr2]}}">9</view>'
    )
  })

  it('generate style binding', () => {
    assertCodegen(
      '<p :style="\'color:red\'">1</p>',
      '<view style="{{(\'color:red\')}}" class="_p">1</view>'
    )
    assertCodegen(
      '<p style="background-color:black" :style="\'color:red\'">1</p>',
      '<view style="{{\'background-color:black;\'+(\'color:red\')}}" class="_p">1</view>'
    )
    assertCodegen(
      '<p :style="{ color: activeColor }">1</p>',
      '<view style="{{\'color:\'+(activeColor)+\';\'}}" class="_p">1</view>'
    )
    assertCodegen(
      '<p :style="{ color: activeColor, fontSize: fontSize + \'px\' }">2</p>',
      '<view style="{{\'color:\'+(activeColor)+\';\'+(\'font-size:\'+(fontSize+\'px\')+\';\')}}" class="_p">2</view>'
    )
    assertCodegen(
      '<p :style="{ color: activeColor }" style="background-color:red;height:100upx">3</p>',
      '<view style="{{\'background-color:red;height:100rpx;\'+(\'color:\'+(activeColor)+\';\')}}" class="_p">3</view>'
    )
    assertCodegen(
      '<p :style="[{ color: activeColor, fontSize: fontSize + \'px\' }]">4</p>',
      '<view style="{{\'color:\'+(activeColor)+\';\'+(\'font-size:\'+(fontSize+\'px\')+\';\')}}" class="_p">4</view>'
    )
    assertCodegen(
      '<p :style="[{ color: activeColor, fontSize: fontSize + \'px\' },{ \'background-color\': activeColor}]">5</p>',
      '<view style="{{\'color:\'+(activeColor)+\';\'+(\'font-size:\'+(fontSize+\'px\')+\';\')+(\'background-color:\'+(activeColor)+\';\')}}" class="_p">5</view>'
    )
    assertCodegen(
      '<div :style="[baseStyles, overridingStyles]">6</div>',
      '<view style="{{$root.s0}}" class="_div">6</view>',
      'with(this){var s0=__get_style([baseStyles,overridingStyles]);$mp.data=Object.assign({},{$root:{s0:s0}})}'
    )
    assertCodegen(
      '<div :style="styleObject">7</div>',
      '<view style="{{(styleObject)}}" class="_div">7</view>'
    )
    //         assertCodegen(
    //             `<div :style="styleObject">7</div>`,
    //             `<view style="{{$root.s0}}">7</view>`,
    //             `with(this){var s0=__get_style(styleObject);$mp.data=Object.assign({},{$root:{s0:s0}})}`
    //         )
    assertCodegen(
      '<p :style="index === currentIndex ? activeStyle : itemStyle">8</p>',
      '<view style="{{(index===currentIndex?activeStyle:itemStyle)}}" class="_p">8</view>'
    )
    assertCodegen(
      '<p :style="\'background:\'+background">9</p>',
      '<view style="{{(\'background:\'+background)}}" class="_p">9</view>'
    )
    assertCodegen(
      '<p :style="styleStr1 || styleStr2" style="background:red">10</p>',
      '<view style="{{\'background:red;\'+(styleStr1||styleStr2)}}" class="_p">10</view>'
    )
  })

  it('generate events with v-on directive on custom component', () => {
    assertCodegen(
      '<my-component @click="handleClick"/>',
      '<my-component bind:click="__e" vue-id="551070e6-1" data-event-opts="{{[[\'^click\',[[\'handleClick\']]]]}}" bind:__l="__l"></my-component>'
    )
    assertCodegen(
      '<my-component @click-left="handleClick"/>',
      '<my-component bind:clickLeft="__e" vue-id="551070e6-1" data-event-opts="{{[[\'^clickLeft\',[[\'handleClick\']]]]}}" bind:__l="__l"></my-component>'
    )
  })

  it('generate v-model directive on custom component', () => {
    assertCodegen(
      '<my-component v-model="test" @input="handle">1</my-component>',
      '<my-component bind:input="__e" vue-id="551070e6-1" value="{{test}}" data-event-opts="{{[[\'^input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[]]],[\'handle\']]]]}}" bind:__l="__l" vue-slots="{{[\'default\']}}">1</my-component>'
    )
    assertCodegen(
      '<my-component v-model="test" @click="handle">2</my-component>',
      '<my-component bind:click="__e" bind:input="__e" vue-id="551070e6-1" value="{{test}}" data-event-opts="{{[[\'^click\',[[\'handle\']]],[\'^input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[]]]]]]}}" bind:__l="__l" vue-slots="{{[\'default\']}}">2</my-component>'
    )
    assertCodegen(
      '<my-component v-model="test.a">3</my-component>',
      '<my-component bind:input="__e" vue-id="551070e6-1" value="{{test.a}}" data-event-opts="{{[[\'^input\',[[\'__set_model\',[\'$0\',\'a\',\'$event\',[]],[\'test\']]]]]}}" bind:__l="__l" vue-slots="{{[\'default\']}}">3</my-component>'
    )
    assertCodegen(
      '<my-component v-model="test.a.b">4</my-component>',
      '<my-component bind:input="__e" vue-id="551070e6-1" value="{{test.a.b}}" data-event-opts="{{[[\'^input\',[[\'__set_model\',[\'$0\',\'b\',\'$event\',[]],[\'test.a\']]]]]}}" bind:__l="__l" vue-slots="{{[\'default\']}}">4</my-component>'
    )
    assertCodegen(
      '<my-component v-model="test[a.b][a.b]">4</my-component>',
      '<my-component bind:input="__e" vue-id="551070e6-1" value="{{test[a.b][a.b]}}" data-event-opts="{{[[\'^input\',[[\'__set_model\',[\'$0\',\'$1\',\'$event\',[]],[\'test.\'+a.b+\'\',\'a.b\']]]]]}}" bind:__l="__l" vue-slots="{{[\'default\']}}">4</my-component>'
    )
    assertCodegen(
      '<my-component v-for="(item, index) in array" :key="index" v-model="item.value" @input="handle" :class="{test:test(index)}"></my-component>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><my-component class="{{[(item.m0)?\'test\':\'\']}}" bind:input="__e" vue-id="{{\'551070e6-1-\'+index}}" value="{{item.$orig.value}}" data-event-opts="{{[[\'^input\',[[\'__set_model\',[\'$0\',\'value\',\'$event\',[]],[[[\'array\',\'\',index]]]],[\'handle\']]]]}}" bind:__l="__l"></my-component></block>',
      'with(this){var l0=__map(array,function(item,index){var $orig=__get_orig(item);var m0=test(index);return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
  })

  it('generate object property on custom component', () => {
    assertCodegen(
      '<my-component v-model="test" @input="handle" />',
      '<my-component bind:input="__e" vue-id="551070e6-1" value="{{test}}" data-event-opts="{{[[\'^input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[]]],[\'handle\']]]]}}" bind:__l="__l"></my-component>'
    )
  })
  it('generate v-text directive', () => {
    assertCodegen(
      '<view v-text="aaa1"></view>',
      '<view>{{aaa1}}</view>'
    )
    assertCodegen(
      '<view v-text="aaa1+1"></view>',
      '<view>{{aaa1+1}}</view>'
    )
    assertCodegen(
      '<view v-text="\'aaa2\'"></view>',
      '<view>aaa2</view>'
    )
  })
  it('generate v-html directive', () => {
    assertCodegen(
      '<view v-html="aaa"></view>',
      '<view><rich-text nodes="{{aaa}}"></rich-text></view>'
    )
  })

  it('generate v-bind directive with sync modifier', () => {
    assertCodegen(
      '<text-document :title.sync="aaa"></text-document>',
      '<text-document vue-id="551070e6-1" title="{{aaa}}" data-event-opts="{{[[\'^updateTitle\',[[\'__set_sync\',[\'$0\',\'aaa\',\'$event\'],[\'\']]]]]}}" bind:updateTitle="__e" bind:__l="__l"></text-document>'
    )
    assertCodegen(
      '<text-document :title.sync="doc.title"></text-document>',
      '<text-document vue-id="551070e6-1" title="{{doc.title}}" data-event-opts="{{[[\'^updateTitle\',[[\'__set_sync\',[\'$0\',\'title\',\'$event\'],[\'doc\']]]]]}}" bind:updateTitle="__e" bind:__l="__l"></text-document>'
    )
    assertCodegen(
      '<text-document :title.sync="doc.a.title"></text-document>',
      '<text-document vue-id="551070e6-1" title="{{doc.a.title}}" data-event-opts="{{[[\'^updateTitle\',[[\'__set_sync\',[\'$0\',\'title\',\'$event\'],[\'doc.a\']]]]]}}" bind:updateTitle="__e" bind:__l="__l"></text-document>'
    )
    assertCodegen(
      '<text-document v-for="item in items" :title.sync="item.title"></text-document>',
      '<block wx:for="{{items}}" wx:for-item="item" wx:for-index="__i0__"><text-document vue-id="{{\'551070e6-1-\'+__i0__}}" title="{{item.title}}" data-event-opts="{{[[\'^updateTitle\',[[\'__set_sync\',[\'$0\',\'title\',\'$event\'],[[[\'items\',\'\',__i0__,\'\']]]]]]]}}" bind:updateTitle="__e" bind:__l="__l"></text-document></block>'
    )
    assertCodegen(
      '<text-document v-for="item in items" :title.sync="item.meta.title"></text-document>',
      '<block wx:for="{{items}}" wx:for-item="item" wx:for-index="__i0__"><text-document vue-id="{{\'551070e6-1-\'+__i0__}}" title="{{item.meta.title}}" data-event-opts="{{[[\'^updateTitle\',[[\'__set_sync\',[\'$0\',\'title\',\'$event\'],[[[\'items\',\'\',__i0__,\'meta\']]]]]]]}}" bind:updateTitle="__e" bind:__l="__l"></text-document></block>'
    )
  })

  it('generate v-model directive with generic modifiers', () => {
    assertCodegen(
      '<input v-model.lazy="test">',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[]]]]]]}}" value="{{test}}" bindinput="__e"/>'
    )
    assertCodegen(
      '<input v-model.number="test">',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[\'number\']]]]],[\'blur\',[[\'$forceUpdate\']]]]}}" value="{{test}}" bindinput="__e" bindblur="__e"/>'
    )
    assertCodegen(
      '<input v-model.number.trim="test">',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[\'number\',\'trim\']]]]],[\'blur\',[[\'$forceUpdate\']]]]}}" value="{{test}}" bindinput="__e" bindblur="__e"/>'
    )
    assertCodegen(
      '<input class="uni-input" @input="replaceInput" v-model="changeValue" placeholder="连续的两个1会变成2" />',
      '<input class="uni-input" placeholder="连续的两个1会变成2" data-event-opts="{{[[\'input\',[[\'__set_model\',[\'\',\'changeValue\',\'$event\',[]]],[\'replaceInput\',[\'$event\']]]]]}}" value="{{changeValue}}" bindinput="__e"/>'
    )
    assertCodegen(
      '<input v-model="model2.m" />',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'$0\',\'m\',\'$event\',[]],[\'model2\']]]]]}}" value="{{model2.m}}" bindinput="__e"/>'
    )
    assertCodegen(
      '<input v-model="model3.m.m" />',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'$0\',\'m\',\'$event\',[]],[\'model3.m\']]]]]}}" value="{{model3.m.m}}" bindinput="__e"/>'
    )
    assertCodegen(
      '<input v-model="model3[a.b][a.b]" />',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'$0\',\'$1\',\'$event\',[]],[\'model3.\'+a.b+\'\',\'a.b\']]]]]}}" value="{{model3[a.b][a.b]}}" bindinput="__e"/>'
    )
  })

  it('generate v-for', () => {
    assertCodegen(
      '<view><view v-for="(item, index) in list"><view>{{handle(item)}}</view></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view>{{item.m0}}</view></view></block></view>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=handle(item);return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view><view v-for="(item, index) in list"><view>{{handle(item)}}{{item.title}}</view></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view>{{item.m0+item.$orig.title}}</view></view></block></view>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=handle(item);return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view><view v-for="(item, index) in list"><view v-for="(item1,index1) in list1">{{handle(item1)}}{{item1.title}}</view></view></view>',
      '<view><block wx:for="{{$root.l1}}" wx:for-item="item" wx:for-index="index"><view><block wx:for="{{item.l0}}" wx:for-item="item1" wx:for-index="index1"><view>{{item1.m0+item1.$orig.title}}</view></block></view></block></view>',
      'with(this){var l1=__map(list,function(item,index){var $orig=__get_orig(item);var l0=__map(list1,function(item1,index1){var $orig=__get_orig(item1);var m0=handle(item1);return{$orig:$orig,m0:m0}});return{$orig:$orig,l0:l0}});$mp.data=Object.assign({},{$root:{l1:l1}})}'
    )
    assertCodegen(
      '<view v-for="(section, index) in sections" :key="index">title: {{ section.title|prefix }}<view v-for="(sub_titles, _index) in section.sub_titles" :key="_index">{{ sub_titles|prefix }}</view></view>',
      '<block wx:for="{{$root.l1}}" wx:for-item="section" wx:for-index="index" wx:key="index"><view>{{"title: "+section.f0}}<block wx:for="{{section.l0}}" wx:for-item="sub_titles" wx:for-index="_index" wx:key="_index"><view>{{sub_titles.f1}}</view></block></view></block>',
      'with(this){var l1=__map(sections,function(section,index){var $orig=__get_orig(section);var f0=_f("prefix")(section.title);var l0=__map(section.sub_titles,function(sub_titles,_index){var $orig=__get_orig(sub_titles);var f1=_f("prefix")(sub_titles);return{$orig:$orig,f1:f1}});return{$orig:$orig,f0:f0,l0:l0}});$mp.data=Object.assign({},{$root:{l1:l1}})}'
    )

    assertCodegen(
      '<view v-for="(item, index) in list" :key="item">{{aaa.item.id | test | test1}}</view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="index" wx:key="*this"><view>{{$root.f0}}</view></block>',
      'with(this){var f0=_f("test1")(_f("test")(aaa.item.id));$mp.data=Object.assign({},{$root:{f0:f0}})}'
    )
    assertCodegen(
      '<view v-for="(item, index) in list" :key="item">{{item.item.id | test | test1}}</view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="$orig"><view>{{item.f0}}</view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var f0=_f("test1")(_f("test")(item.item.id));return{$orig:$orig,f0:f0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<text v-for="(item, i) in list" v-bind:key="i" >{{ item.split(\'\').join(\' \') }}</text>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="i" wx:key="i"><text>{{item.g0}}</text></block>',
      'with(this){var l0=__map(list,function(item,i){var $orig=__get_orig(item);var g0=item.split("").join(" ");return{$orig:$orig,g0:g0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      `<view class="content">
        <view v-for="(item, index) in tabList" :key="index">
            <view v-for="(item2,index2) in list[item.key]" :key="index2" @click="show(item2.id, item2.id)">
                {{formatIt(item2.id)}}
            </view>
        </view>
    </view>`,
      '<view class="content"><block wx:for="{{$root.l1}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:for="{{item.l0}}" wx:for-item="item2" wx:for-index="index2" wx:key="index2"><view data-event-opts="{{[[\'tap\',[[\'show\',[\'$0\',\'$1\'],[[[\'list.\'+item.$orig.key+\'\',\'\',index2,\'id\']],[[\'list.\'+item.$orig.key+\'\',\'\',index2,\'id\']]]]]]]}}" bindtap="__e">{{\'\'+item2.m0+\'\'}}</view></block></view></block></view>',
      'with(this){var l1=__map(tabList,function(item,index){var $orig=__get_orig(item);var l0=__map(list[item.key],function(item2,index2){var $orig=__get_orig(item2);var m0=formatIt(item2.id);return{$orig:$orig,m0:m0}});return{$orig:$orig,l0:l0}});$mp.data=Object.assign({},{$root:{l1:l1}})}'
    )
    assertCodegen(
      '<view><view v-for="(item, key) in {x:\'x\'}"><view>{{item}}</view></view></view>',
      '<view><block wx:for="{{({x:\'x\'})}}" wx:for-item="item" wx:for-index="key"><view><view>{{item}}</view></view></block></view>'
    )
    assertCodegen(
      '<view><view v-for="(item, key) in {\'x-x\':\'x\'}"><view>{{item}}</view></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="key"><view><view>{{item}}</view></view></block></view>',
      'with(this){var l0={"x-x":"x"};$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view><view v-for="(item, index) in getList(test)"><view>{{item}}</view></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view>{{item}}</view></view></block></view>',
      'with(this){var l0=getList(test);$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view><view v-for="(item, index) in list[get(test)]"><view>{{item}}</view></view></view>',
      '<view><block wx:for="{{list[$root.m0]}}" wx:for-item="item" wx:for-index="index"><view><view>{{item}}</view></view></block></view>',
      'with(this){var m0=get(test);$mp.data=Object.assign({},{$root:{m0:m0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in items" :key="index"><view v-if="item"><input v-for="(item1,index1) in item" :key="index1" :placehold="getValue(item1)" :value="getValue(item)"></view></view>',
      '<block wx:for="{{$root.l1}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.$orig}}"><view><block wx:for="{{item.l0}}" wx:for-item="item1" wx:for-index="index1" wx:key="index1"><input placehold="{{item1.m0}}" value="{{item1.m1}}"/></block></view></block></view></block>',
      'with(this){var l1=__map(items,function(item,index){var $orig=__get_orig(item);var l0=item?__map(item,function(item1,index1){var $orig=__get_orig(item1);var m0=getValue(item1);var m1=getValue(item);return{$orig:$orig,m0:m0,m1:m1}}):null;return{$orig:$orig,l0:l0}});$mp.data=Object.assign({},{$root:{l1:l1}})}'
    )
    assertCodegen(
      `
      <view v-for="(value,key,index) in dataObj" :key="index">
        index:{{index}}--key:{{key}}--value:{{value}}
      </view>
      `,
      '<block wx:for="{{$root.l0}}" wx:for-item="value" wx:for-index="key" wx:key="$index"><view>{{\'index:\'+value.$index+"--key:"+key+"--value:"+value.$orig+\'\'}}</view></block>',
      'with(this){var l0=__map(dataObj,function(value,key,index){var $orig=__get_orig(value);return{$orig:$orig,$index:index}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
  })

  it('generate TemplateLiteral ', () => {
    assertCodegen(
      /* eslint-disable no-template-curly-in-string */
      '<view @tap="go(`/pages/page/page?id=${aaa}`)"></view>',
      '<view data-event-opts="{{[[\'tap\',[[\'go\',[\'/pages/page/page?id=\'+aaa]]]]]}}" bindtap="__e"></view>'
    )
    assertCodegen(
      /* eslint-disable no-template-curly-in-string */
      '<view :data-test="`hello`+aaa"></view>',
      '<view data-test="{{\'hello\'+aaa}}"></view>'
    )
  })
  it('generate event ', () => {
    assertCodegen(
      '<view @/>',
      '<view></view>'
    )

    assertCodegen(
      '<text v-for="item in items[\'metas\']" :key="item[\'id\']" class="title" @tap="handle(item[\'id\'],item[\'title\'])">{{item.title}}</text>',
      '<block wx:for="{{items[\'metas\']}}" wx:for-item="item" wx:for-index="__i0__" wx:key="id"><text data-event-opts="{{[[\'tap\',[[\'handle\',[\'$0\',\'$1\'],[[[\'items.metas\',\'id\',item[\'id\'],\'id\']],[[\'items.metas\',\'id\',item[\'id\'],\'title\']]]]]]]}}" class="title" bindtap="__e">{{item.title}}</text></block>'
    )
    assertCodegen(
      '<view @touchmove>1</view>',
      '<view data-event-opts="{{[[\'touchmove\',[[\'\',[\'$event\']]]]]}}" bindtouchmove="__e">1</view>'
    )
    assertCodegen(
      '<view @touchmove="">2</view>',
      '<view data-event-opts="{{[[\'touchmove\',[[\'\',[\'$event\']]]]]}}" bindtouchmove="__e">2</view>'
    )
    assertCodegen(
      '<view @touchmove.stop.prevent>3</view>',
      '<view data-event-opts="{{[[\'touchmove\',[[\'\',[\'$event\']]]]]}}" catchtouchmove="__e">3</view>'
    )
    assertCodegen(
      '<view @tap="change(item,item.b,\'a\',true)"></view>',
      '<view data-event-opts="{{[[\'tap\',[[\'change\',[\'$0\',\'$1\',\'a\',true],[\'item\',\'item.b\']]]]]}}" bindtap="__e"></view>'
    )
    assertCodegen(
      '<view @click="handle({name:\'a\',b:123},[1,2,3])"></view>',
      '<view data-event-opts="{{[[\'tap\',[[\'handle\',[[\'o\',[\'name\',\'a\'],[\'b\',123]],[1,2,3]]]]]]}}" bindtap="__e"></view>'
    )
    assertCodegen(
      '<text v-for="(item,index) in pickerList[pickerIndex[0][2][\'asdf\']].children" :key="index">{{item.title}}</text>',
      '<block wx:for="{{pickerList[pickerIndex[0][2][\'asdf\']].children}}" wx:for-item="item" wx:for-index="index" wx:key="index"><text>{{item.title}}</text></block>'
    )
    assertCodegen(
      '<text v-for="(item,index) in pickerList[0][1].children" :key="index" @tap="handle(item,index)">{{item.title}}</text>',
      '<block wx:for="{{pickerList[0][1].children}}" wx:for-item="item" wx:for-index="index" wx:key="index"><text data-event-opts="{{[[\'tap\',[[\'handle\',[\'$0\',index],[[[\'pickerList.__$n0.__$n1.children\',\'\',index]]]]]]]}}" bindtap="__e">{{item.title}}</text></block>'
    )
    assertCodegen(
      '<view v-for="(v2,i2) in ddd.item[0]" :key="i2" @tap="toInfo(v2)"></view>',
      '<block wx:for="{{ddd.item[0]}}" wx:for-item="v2" wx:for-index="i2" wx:key="i2"><view data-event-opts="{{[[\'tap\',[[\'toInfo\',[\'$0\'],[[[\'ddd.item.__$n0\',\'\',i2]]]]]]]}}" bindtap="__e"></view></block>'
    )
    assertCodegen(
      '<button type="primary" @click="test(arr, arr[index+1])">click me</button>',
      '<button type="primary" data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\',\'$1\'],[\'arr\',\'arr.\'+(index+1)+\'\']]]]]}}" bindtap="__e">click me</button>'
    )
    assertCodegen(
      '<button type="primary" @click="test(arr, arr[getVal(index+1)])">click me</button>',
      '<button type="primary" data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\',\'$1\'],[\'arr\',\'arr.\'+$root.m0+\'\']]]]]}}" bindtap="__e">click me</button>',
      'with(this){var m0=getVal(index+1);$mp.data=Object.assign({},{$root:{m0:m0}})}'
    )
    assertCodegen(
      '<button type="primary" @click="test(arr, arr[0])">click me</button>',
      '<button type="primary" data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\',\'$1\'],[\'arr\',\'arr.__$n0\']]]]]}}" bindtap="__e">click me</button>'
    )
    assertCodegen(
      '<view v-for="item in list" @click="test(item)">{{ item }}</view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="__i0__"><view data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\'],[[[\'list\',\'\',__i0__]]]]]]]}}" bindtap="__e">{{item}}</view></block>'
    )
    assertCodegen(
      '<view v-for="item in list" @click="test(arr[item])">{{ item }}</view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="__i0__"><view data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\'],[\'arr.\'+item+\'\']]]]]}}" bindtap="__e">{{item}}</view></block>'
    )
    assertCodegen(
      '<view v-for="item in list" @click="test(arr[getVal(item)])">{{ item }}</view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="__i0__"><view data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\'],[\'arr.\'+item.m0+\'\']]]]]}}" bindtap="__e">{{item.$orig}}</view></block>',
      'with(this){var l0=__map(list,function(item,__i0__){var $orig=__get_orig(item);var m0=getVal(item);return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="item in list" :data-val="getVal(item)" @click="test(arr[(item)])">{{ item }}</view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="__i0__"><view data-val="{{item.m0}}" data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\'],[\'arr.\'+item.$orig+\'\']]]]]}}" bindtap="__e">{{item.$orig}}</view></block>',
      'with(this){var l0=__map(list,function(item,__i0__){var $orig=__get_orig(item);var m0=getVal(item);return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="item in list" @click.stop="test(item)">{{ item }}</view>',
      '<block wx:for="{{list}}" wx:for-item="item" wx:for-index="__i0__"><view data-event-opts="{{[[\'tap\',[[\'test\',[\'$0\'],[[[\'list\',\'\',__i0__]]]]]]]}}" catchtap="__e">{{item}}</view></block>'
    )
    assertCodegen(
      '<view v-for="(item, index) in [{x:[1,2,3,4]}]"><view v-for="item2 in item.x" @click="test(item2)">{{ item2 }}+{{index}}</view></view>',
      '<block wx:for="{{[{x:[1,2,3,4]}]}}" wx:for-item="item" wx:for-index="index"><view><block wx:for="{{item.x}}" wx:for-item="item2" wx:for-index="__i0__"><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item2})}}" bindtap="__e">{{item2+"+"+index}}</view></block></view></block>',
      'with(this){if(!_isMounted){e0=function($event,item2){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item2=_temp2.item2;var _temp,_temp2;return test(item2)}}}'
    )
    assertCodegen(
      '<view v-for="(item, index) in array()"><view @click="test"></view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view data-event-opts="{{[[\'tap\',[[\'test\',[\'$event\']]]]]}}" bindtap="__e"></view></view></block>',
      'with(this){var l0=array();$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item, index) in array()"><view @click="test(item)"></view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item})}}" bindtap="__e"></view></view></block>',
      'with(this){var l0=array();if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;return test(item)}}$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item, index) in array()"><view @click.stop="test(item)"></view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item})}}" catchtap="__e"></view></view></block>',
      'with(this){var l0=array();if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;$event.stopPropagation();return test(item)}}$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item, index) in array()"><view @click="test(item)">{{item}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item})}}" bindtap="__e">{{item}}</view></view></block>',
      'with(this){var l0=array();if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;return test(item)}}$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item, index) in array()"><view @click="test(item)">{{get(item)}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><view><view data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item:item.$orig})}}" bindtap="__e">{{item.m0}}</view></view></block>',
      'with(this){var l0=__map(array(),function(item,index){var $orig=__get_orig(item);var m0=get(item);return{$orig:$orig,m0:m0}});if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;return test(item)}}$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<template v-for="item in [1,2]"><input v-model="values[item]" /></template>',
      '<block wx:for="{{[1,2]}}" wx:for-item="item" wx:for-index="__i0__"><input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" data-event-params="{{({item})}}" value="{{values[item]}}" bindinput="__e"/></block>',
      'with(this){if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;$event=$event.target.value;return __set_model(values,item,$event,[])}}}'
    )
    assertCodegen(
      '<template v-for="item in [1,2]"><custom-input v-model="values[item]" /></template>',
      '<block wx:for="{{[1,2]}}" wx:for-item="item" wx:for-index="__i0__"><custom-input bind:input="__e" vue-id="{{\'551070e6-1-\'+__i0__}}" value="{{values[item]}}" data-event-opts="{{[[\'^input\',[[\'e0\']]]]}}" data-event-params="{{({item})}}" bind:__l="__l"></custom-input></block>',
      'with(this){if(!_isMounted){e0=function($event,item){var _temp=arguments[arguments.length-1].currentTarget.dataset,_temp2=_temp.eventParams||_temp["event-params"],item=_temp2.item;var _temp,_temp2;return __set_model(values,item,$event,[])}}}'
    )
    assertCodegen(
      '<button type="primary" @click="click1();obj.click2();">click me</button>',
      '<button type="primary" data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" bindtap="__e">click me</button>',
      'with(this){if(!_isMounted){e0=function($event){click1();obj.click2()}}}'
    )
    assertCodegen(
      '<button type="primary" @click="()=>test(encodeURIComponent(JSON.stringify(arr)))">click me</button>',
      '<button type="primary" data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" bindtap="__e">click me</button>',
      'with(this){if(!_isMounted){e0=()=>test(encodeURIComponent(JSON.stringify(arr)))}}'
    )
    assertCodegen(
      '<button type="primary" @click="test(a().b)">click me</button>',
      '<button type="primary" data-event-opts="{{[[\'tap\',[[\'e0\',[\'$event\']]]]]}}" bindtap="__e">click me</button>',
      'with(this){if(!_isMounted){e0=function($event){test(a().b)}}}'
    )
  })
  it('generate bool attr', () => {
    assertCodegen(
      '<video id class style inline-template controls/>',
      '<video id controls="{{true}}"></video>'
    )
    assertCodegen(
      '<video controls=""/>',
      '<video controls></video>'
    )
  })
  it('generate v-if', () => {
    assertCodegen(
      '<view v-if="show">{{getValue(key)}}</view>',
      '<block wx:if="{{show}}"><view>{{$root.m0}}</view></block>',
      'with(this){var m0=show?getValue(key):null;$mp.data=Object.assign({},{$root:{m0:m0}})}'
    )
    assertCodegen(
      '<view v-if="getValue(key)">{{getValue(key)}}</view>',
      '<block wx:if="{{$root.m0}}"><view>{{$root.m1}}</view></block>',
      'with(this){var m0=getValue(key);var m1=m0?getValue(key):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}'
    )
    assertCodegen(
      '<view v-if="test1(key)&&test2(key)">{{getValue(key)}}</view>',
      '<block wx:if="{{$root.m0}}"><view>{{$root.m1}}</view></block>',
      'with(this){var m0=test1(key)&&test2(key);var m1=m0?getValue(key):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}'
    )
    assertCodegen(
      '<view v-if="test.test(key)&&test2(key)">{{getValue(key)}}</view>',
      '<block wx:if="{{$root.g0}}"><view>{{$root.m0}}</view></block>',
      'with(this){var g0=test.test(key)&&test2(key);var m0=g0?getValue(key):null;$mp.data=Object.assign({},{$root:{g0:g0,m0:m0}})}'
    )
    assertCodegen(
      '<view v-if="show"><view v-if="test.test(key)&&test2(key)">{{getValue(key)}}</view></view>',
      '<block wx:if="{{show}}"><view><block wx:if="{{$root.g0}}"><view>{{$root.m0}}</view></block></view></block>',
      'with(this){var g0=show?test.test(key)&&test2(key):null;var m0=show&&g0?getValue(key):null;$mp.data=Object.assign({},{$root:{g0:g0,m0:m0}})}'
    )
    assertCodegen(
      '<view v-if="test&&!test.test(key1)&&!test.test(key2)">{{getValue(key)}}</view>',
      '<block wx:if="{{$root.g0}}"><view>{{$root.m0}}</view></block>',
      'with(this){var g0=test&&!test.test(key1)&&!test.test(key2);var m0=g0?getValue(key):null;$mp.data=Object.assign({},{$root:{g0:g0,m0:m0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="item">{{getValue(item)}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.$orig}}"><view>{{item.m0}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=item?getValue(item):null;return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="item.num">{{getValue(item)}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.$orig.num}}"><view>{{item.m0}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=item.num?getValue(item):null;return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="item.num>0">{{getValue(item)}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.$orig.num>0}}"><view>{{item.m0}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=item.num>0?getValue(item):null;return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="item.num>0">{{test(\'item\')}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.$orig.num>0}}"><view>{{item.m0}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=item.num>0?test("item"):null;return{$orig:$orig,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="test(item)">{{test(\'item\')}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.m0}}"><view>{{item.m1}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=test(item);var m1=m0?test("item"):null;return{$orig:$orig,m0:m0,m1:m1}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="test(item.id)"><view v-if="test(item.type)">{{test(\'item\')}}</view></view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.m0}}"><view><block wx:if="{{item.m1}}"><view>{{item.m2}}</view></block></view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var m0=test(item.id);var m1=m0?test(item.type):null;var m2=m0&&m1?test("item"):null;return{$orig:$orig,m0:m0,m1:m1,m2:m2}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="Object.values(item.list)[0]">{{test(item.list)}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.g0[0]}}"><view>{{item.m0}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var g0=Object.values(item.list);var m0=g0[0]?test(item.list):null;return{$orig:$orig,g0:g0,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
  })
})
