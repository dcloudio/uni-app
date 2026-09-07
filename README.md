<p>简体中文 | <a href="./README_en-US.md">English</a></p>

`uni-app`是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、鸿蒙、Web（响应式）、以及各种小程序（微信/支付宝/百度/抖音/飞书/QQ/快手/钉钉/淘宝/京东/小红书）、快应用、鸿蒙元服务等多个平台。

`DCloud`公司拥有上千万开发者、数百万应用、几十亿手机端月活用户、数万款uni-app插件，开发者可以放心选择。

`uni-app`分 `uni-app` 和 `uni-app x`。

- uni-app：老一代uni-app，App引擎采用与小程序相同的技术架构，逻辑层使用js，渲染层使用web-view。
- uni-app x：新一代 uni-app，也是本项目的主分支。蒸汽模式支持使用js/ts/uts开发页面，App平台使用原生渲染，但拥有比原生view体系更优秀的渲染性能。

1. 在view和text组件性能测试中，uni-app x 在Android、iOS、鸿蒙 3个App平台的渲染速度是原生的2~3倍。
2. 在长列表掉帧测试中，uni-app x 的长列表帧率，在Android、iOS、鸿蒙 3个App平台，是原生的2~4倍。

除了view、text、list，还有更多评测内容，详见benchmark目录下的3个平台的评测报告。
- [uni-app x Android平台性能评测报告](https://github.com/dcloudio/uni-app/benchmark/vapor-benchmark-android.md)
- [uni-app x iOS平台性能评测报告](https://github.com/dcloudio/uni-app/benchmark/vapor-benchmark-ios.md)
- [uni-app x 鸿蒙平台性能评测报告](https://github.com/dcloudio/uni-app/benchmark/vapor-benchmark-harmony.md)

uts是一门类ts的、跨平台的语言。uts在Android平台编译为kotlin、在iOS平台编译为swift、在鸿蒙next平台上编译为ArkTS、在Web和小程序平台编译为js。uts语言主要用于原生插件扩展。

`uni-app`在手，做啥都不愁。不管用户需要做哪个平台的项目，你都可以快速交付，不需要转换开发思维、不需要更改开发习惯。

即使不跨端，`uni-app`也是更好的小程序开发框架、更好的App开发框架、更方便的Web开发框架。
- 更好的小程序框架：vue的通用性、生态，比小程序厂商自定语法要好的多。
- 更好的App框架：vue的模板写法，是一种AI熟悉的、简单而成熟的声明式写法。比如原生的命令式写法的开发效率高的多，而原生提供的声明式写法又性能不佳。在AI时代，由于声明式的约束，让AI犯错的机会也少的多、消耗的token也少的多。

`uni-app`是一个AI友好的技术框架，使用AI擅长的vue、js/ts、css即可完成应用开发。`uni-app`还为AI模型训练提供了强化学习工具，[详见](https://doc.dcloud.net.cn/uni-app-x/ai/cli-for-aimodel.html)。同时DCloud公司提供了[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，可以更方便的使用AI开发`uni-app`

## 快速体验

<div class="quick">
    <!-- <h3 id="快速体验"><a href="/README?id=%e5%bf%ab%e9%80%9f%e4%bd%93%e9%aa%8c" data-id="快速体验" class="anchor"><span>快速体验</span></a></h3> -->
    <image src="https://web-ext-storage.dcloud.net.cn/doc/uni_app_qrcode.png" alt="hello uni-app x 示例效果图"/>
    <p>注：<br/>
        <em>- 某些平台不能提交简单demo，故补充了一些其他功能；hello uni-app (x)示例代码可从 <a href="https://github.com/dcloudio/hello-uniapp">github</a> 获取</em></br>
        <em>- 快应用仅支持 vivo 、oppo、华为</em></br>
    </p>
</div>

## 仓库介绍

uni-app x 分支，为 uni-app x 版本的开源仓库。

uni-app，分 vue2 和 vue3，分支分别是：uni-app-vue2、uni-app-vue3。

uni-app x分支目录说明：
- benchmark 目录下为性能评测报告
- docs 目录为文档
- examples 目录为示例项目
- src 目录为源码
- test 目录为测试例
- CHANGELOG.md 为更新日志

## 一套代码，运行到多个平台

`uni-app`实现了一套代码，同时运行到多个平台；如下图所示，一套代码，同时运行到iOS模拟器、Android模拟器、web、微信开发者工具、支付宝小程序Studio、百度开发者工具、抖音开发者工具、QQ开发者工具（底部每个终端选项卡，代表1个终端模拟器）：

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/dev1x8.jpg)

实际运行效果如下（点击图片可放大）：

![](https://web-ext-storage.dcloud.net.cn/doc/uni-app-multiport-202478.png)


## 🌐 Web Resources & Interactive Index
- [BLOCK PUZZLE 3D](https://eduquests.onrender.com/block-puzzle-3d.html)
- [3D MAZE CONTROL](https://brainquestsfr.pages.dev/3d-maze-control.html)
- [LIMITED DEFENSE](https://eduquestspt.pages.dev/limited-defense.html)
- [TOWER GUARDIAN EPIC DEFENSE](https://learnaction.netlify.app/tower-guardian-epic-defense.html)
- [MEMOJI](https://eduquestspt.pages.dev/memoji.html)
- [RAGDOLL BOB PUZZLE](https://eduquests.github.io/ragdoll-bob-puzzle.html)
- [HORDE HUNTERS](https://eduquests.pages.dev/horde-hunters.html)
- [CATEGORY UNBLOCKERS](https://eduquests.pages.dev/category-unblockers.html)
- [SHAPE SHIFT](https://eduquests.netlify.app/shape-shift.html)
- [100 DOORS CHALLENGE](https://eduquests.pages.dev/100-doors-challenge.html)
- [WEAPONSMITH EVOLUTION WEAPON MERGE](https://eduquests.pages.dev/weaponsmith-evolution-weapon-merge.html)
- [POGO MASTERS](https://eduquestspt.pages.dev/pogo-masters.html)
- [PRIVACY](https://eduquests.github.io/privacy.html)
- [CATEGORY SOCCER](https://eduquestses.pages.dev/category-soccer.html)
- [MERGEDUELIO](https://ieduquests.web.app/mergeduelio.html)
- [NUTS BOLTS PUZZLE](https://eduquests.github.io/nuts-bolts-puzzle.html)
- [LAST WAR SURVIVAL](https://eduquests.netlify.app/last-war-survival.html)
- [INDEX3](https://eduquests.netlify.app/index3.html)
- [CATEGORY SKILL256](https://eduquests.pages.dev/category-skill256.html)
- [CATEGORY GOGUARDIANBYPASS](https://eduquestsfr.pages.dev/category-goguardianbypass.html)
- [WORLD Z DEFENSE ZOMBIE DEFENSE](https://eduquestspt.pages.dev/world-z-defense-zombie-defense.html)
- [ULTIMATE BRAINROT CLICKER](https://welearnaction.onrender.com/ultimate-brainrot-clicker.html)
- [CATEGORY ALIEN34](https://eduquestsfr.pages.dev/category-alien34.html)
- [TOWER WARS ARENA](https://ieduquests.web.app/tower-wars-arena.html)
- [WAVE ROAD 3D](https://eduquests.netlify.app/wave-road-3d.html)
- [KITTY MATCH 3 PUZZLE GAME](https://eduquests.pages.dev/kitty-match-3-puzzle-game.html)
- [CATEGORY CONTROLLER59](https://eduquests.netlify.app/category-controller59.html)
- [CATEGORY ADVENTURE 3](https://eduquestsfr.pages.dev/category-adventure-3.html)
- [CATEGORY PIXEL](https://brainquests.pages.dev/category-pixel.html)
- [MEGA PRIZE SCRATCH](https://eduquests.pages.dev/mega-prize-scratch.html)
- [SITEMAP](https://iskillplay.web.app/sitemap.html)
- [STICKMAN ARCHERO FIGHT STICK SHADOW FIGHT WAR](https://eduquests.netlify.app/stickman-archero-fight-stick-shadow-fight-war.html)
- [CAT PANCAKE DINER](https://learnaction.github.io/cat-pancake-diner.html)
- [DRIVERZ ED](https://eduquests.github.io/driverz-ed.html)
- [CRAB GUARDS](https://learnaction.github.io/crab-guards.html)
- [PAINT ROLLER](https://eduquests.github.io/paint-roller.html)
- [MASTER ADDICTION SOLITAIRE](https://ieduquests.web.app/master-addiction-solitaire.html)
- [VOID ORBIT](https://eduquestkr.pages.dev/void-orbit.html)
- [BATTLE SHOT ELITE](https://brainquests.pages.dev/battle-shot-elite.html)
- [CATEGORY ARMY](https://brainquests.pages.dev/category-army.html)
- [BOOM LAND LITE](https://eduquests.github.io/boom-land-lite.html)
- [CATEGORY ADVENTURE 2](https://eduquestsfr.pages.dev/category-adventure-2.html)
- [ITALIAN BRAINROT PUZZLE](https://brainquests.pages.dev/italian-brainrot-puzzle.html)
- [COLOR SORT MANIA](https://brainquests.pages.dev/color-sort-mania.html)
- [STICKMAN ZOMBIE VS STICKMAN HERO](https://learnaction.github.io/stickman-zombie-vs-stickman-hero.html)
- [DEEP IN THE LAB CHAPTER 1](https://eduquests.netlify.app/deep-in-the-lab-chapter-1.html)
- [DRAW TO SMASH ZOMBIE](https://learnaction.netlify.app/draw-to-smash-zombie.html)
- [ROBOCARPOLI](https://eduquestspt.pages.dev/robocarpoli.html)
- [GUN FEST](https://eduquests.pages.dev/gun-fest.html)
- [ANIMAL SWIPE](https://ieduquests.web.app/animal-swipe.html)
- [LAST STANDING](https://eduquestsfr.pages.dev/last-standing.html)
- [CATEGORY TOP DOWN251](https://eduquests.pages.dev/category-top-down251.html)
- [CAPYBARA COIN MASTER](https://learnaction.netlify.app/capybara-coin-master.html)
- [CATEGORY BIKE](https://eduquests.netlify.app/category-bike.html)
- [SCRAP CAR MERGE](https://eduquestses.pages.dev/scrap-car-merge.html)
- [CATEGORY CRAFTING45](https://brainquests.pages.dev/category-crafting45.html)
- [DEEP FISHING](https://eduquestses.pages.dev/deep-fishing.html)
- [TRAFFIC TAP PUZZLE](https://eduquests.github.io/traffic-tap-puzzle.html)
- [MAZE ESCAPE CHALLENGE](https://eduquestsfr.pages.dev/maze-escape-challenge.html)
- [MAGIC PRINTER](https://eduquestkr.pages.dev/magic-printer.html)
- [STICKMAN DISMOUNT SIMULATOR](https://ieduquests.web.app/stickman-dismount-simulator.html)
- [ITALIAN BRAINROT QUIZ](https://learnaction.netlify.app/italian-brainrot-quiz.html)
- [CHRISTMAS CANDY ESCAPE 3D](https://welearnaction.onrender.com/christmas-candy-escape-3d.html)
- [ANIMAL SORT CUTE PUZZLE GAME](https://eduquestkr.pages.dev/animal-sort-cute-puzzle-game.html)
- [CATEGORY BUILDING179](https://eduquestsfr.pages.dev/category-building179.html)
- [CATEGORY TURN BASED30](https://eduquests.github.io/category-turn-based30.html)
- [UNSCREW WOOD PUZZLE](https://brainquests.pages.dev/unscrew-wood-puzzle.html)
- [LABUBU MERGE](https://eduquestspt.pages.dev/labubu-merge.html)
- [CATEGORY MOUSE1 697](https://eduquests.netlify.app/category-mouse1-697.html)
- [FRUIT JAM MERGE PUZZLE GAME](https://ieduquests.web.app/fruit-jam-merge-puzzle-game.html)
- [CANDY CRUNCH SUGAR ESCAPE](https://eduquestsfr.pages.dev/candy-crunch-sugar-escape.html)
- [INDEX40](https://eduquestsfr.pages.dev/index40.html)
- [INDEX3](https://eduquests.pages.dev/index3.html)
- [FRUITY CRAFT MERGE](https://eduquestsfr.pages.dev/fruity-craft-merge.html)
- [3D SUPER ROLLING BALL RACE](https://eduquestses.pages.dev/3d-super-rolling-ball-race.html)
- [ROPE STITCH PUZZLE](https://learnaction.github.io/rope-stitch-puzzle.html)
- [CHECKERS DRAUGHTS MULTIPLAYER](https://learnaction.netlify.app/checkers-draughts-multiplayer.html)
- [FRUIT KING MERGE](https://eduquestkr.pages.dev/fruit-king-merge.html)
- [CATEGORY MOUSE](https://eduquestkr.pages.dev/category-mouse.html)
- [POP CULTURE HALLOWEEN MAKEUP](https://ieduquests.web.app/pop-culture-halloween-makeup.html)
- [TANK STARS BATTLE ARENA](https://eduquests.github.io/tank-stars-battle-arena.html)
- [CITY GAS STATION SIMULATOR](https://eduquestkr.pages.dev/city-gas-station-simulator.html)
- [CATEGORY MINECRAFT](https://eduquests.netlify.app/category-minecraft.html)
- [FOREST TILE MATCH](https://eduquests.netlify.app/forest-tile-match.html)
- [UNBLOCK IT ATLANTIS](https://eduquests.pages.dev/unblock-it-atlantis.html)
- [CATEGORY CONTROLLER 3](https://brainquests.pages.dev/category-controller-3.html)
- [DRUNK BUT NOT WASTED KNIGHT](https://learnaction.github.io/drunk-but-not-wasted-knight.html)
- [ZEN MASTER 3 TILES](https://eduquests.pages.dev/zen-master-3-tiles.html)
- [CATEGORY SIMULATION](https://eduquestkr.pages.dev/category-simulation.html)
- [FIGHT TO THE END](https://learnaction.github.io/fight-to-the-end.html)
- [PUZZLE BLOCKS ASMR MATCH](https://eduquests.netlify.app/puzzle-blocks-asmr-match.html)
- [CATEGORY SPOT THE DIFFERENCE](https://eduquests.pages.dev/category-spot-the-difference.html)
- [RACING BALL ADVENTURE](https://eduquests.netlify.app/racing-ball-adventure.html)
- [MERGE BALLS NEW YEARS TOYS IN 3D](https://welearnaction.onrender.com/merge-balls-new-years-toys-in-3d.html)
- [INDEX22](https://eduquestspt.pages.dev/index22.html)
- [INDEX18](https://brainquests.pages.dev/index18.html)
- [CATEGORY SNIPER39](https://eduquests.pages.dev/category-sniper39.html)
- [SWEET AND FRUITY MAKEUP](https://learnaction.github.io/sweet-and-fruity-makeup.html)
- [CATEGORY CASUAL 13](https://eduquestsfr.pages.dev/category-casual-13.html)
- [CATEGORY MATCH 3](https://eduquests.pages.dev/category-match-3.html)
- [DUET CATS HALLOWEEN CAT MUSIC](https://ieduquests.web.app/duet-cats-halloween-cat-music.html)
- [RACING MASTER 3D](https://eduquestkr.pages.dev/racing-master-3d.html)
- [CHICKEN WILD RUN](https://learnaction.github.io/chicken-wild-run.html)
- [CHRONO DRIVE](https://eduquests.netlify.app/chrono-drive.html)
- [HIDDEN PAIRS MAHJONG](https://eduquestsfr.pages.dev/hidden-pairs-mahjong.html)
- [CATEGORY BUILDING182](https://eduquestsfr.pages.dev/category-building182.html)
- [DRAW BRIDGE CHALLENGE](https://eduquestses.pages.dev/draw-bridge-challenge.html)
- [MY PURRFECT CAT HOTEL](https://learnaction.netlify.app/my-purrfect-cat-hotel.html)
- [PENGUIN ADVENTURE](https://eduquestses.pages.dev/penguin-adventure.html)
- [INDEX22](https://brainquests.pages.dev/index22.html)
- [INCOWORD](https://eduquests.pages.dev/incoword.html)
- [HOTEL FEVER TYCOON](https://welearnaction.onrender.com/hotel-fever-tycoon.html)
- [MY DINOSAUR LAND](https://eduquestses.pages.dev/my-dinosaur-land.html)
- [SNIPER VS SNIPER](https://brainquests.pages.dev/sniper-vs-sniper.html)
- [MERGE RUN BATTLE](https://brainquests.pages.dev/merge-run-battle.html)
- [GUN FEST](https://learnaction.github.io/gun-fest.html)
- [TRI PEAKS EMERLAND SOLITAIRE](https://eduquests.pages.dev/tri-peaks-emerland-solitaire.html)
- [PRACTICE ON ME](https://learnaction.github.io/practice-on-me.html)
- [NINJA TIME](https://welearnaction.onrender.com/ninja-time.html)
- [STEAL BRAINROT ARENA](https://eduquestspt.pages.dev/steal-brainrot-arena.html)
- [CHESSFIELD](https://ieduquests.web.app/chessfield.html)
- [TEAM LOYALTY](https://learnaction.netlify.app/team-loyalty.html)
- [WEDNESDAY DARK ACADEMIA](https://eduquestspt.pages.dev/wednesday-dark-academia.html)
- [WONDERS OF EGYPT MATCH 2](https://welearnaction.onrender.com/wonders-of-egypt-match-2.html)
- [CATEGORY MANAGEMENT210](https://eduquests.pages.dev/category-management210.html)
- [CATEGORY TRIVIA COLLECTION](https://eduquests.pages.dev/category-trivia-collection.html)
- [CONNECT EM ALL](https://eduquestspt.pages.dev/connect-em-all.html)
- [ISOMETRIC ESCAPE 2](https://learnaction.netlify.app/isometric-escape-2.html)
- [MY PURRFECT CAT HOTEL](https://eduquestsfr.pages.dev/my-purrfect-cat-hotel.html)
- [CATEGORY MERGE224](https://brainquests.pages.dev/category-merge224.html)
