// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/

jest.setTimeout(50000);

// 调试用：临时覆盖某些页面的测试参数，不需要时置为 null
// 可以写多个页面，例如只跑 margin 相关的页面：
// skipAssert: false, // true 时跳过 expectedValue 断言
const TEST_OVERRIDE = null

// const TEST_OVERRIDE = [
//   {
//     path: '/pages/CSS/layout/visibility',
//     method: 'radioChangeVisibility',
//     valueIndex: 2,
//     styleName: 'visibility',
//     expectedValue: {
//       visibility: 'visible',
//       visibilityActual: 'hidden',
//       visibilityActualText: 'hidden',
//       visibilityActualImage: 'hidden'
//     }
//   },
// ];


// CSS setProperty 测试配置数组
const cssTests = [
  {
      path: '/pages/CSS/layout/width',
      method: 'radioChangeWidth',
      valueIndex: 3,
      styleName: 'width',
      expectedValue: {
        width: '50px',
        widthActual: '50px',
        widthActualText: '50px',
        widthActualImage: '50px',
        widthActualFlat: '50px',
        widthActualTextFlat: '50px',
        widthActualImageFlat: '50px',
      }
    },
    {
      path: '/pages/CSS/layout/min-width',
      method: 'radioChangeMinWidth',
      valueIndex: 4,
      styleName: 'min-width',
      expectedValue: {
        minWidth: '120px',
        minWidthActual: '120px',
        minWidthActualText: '120px',
        minWidthActualImage: '120px',
        minWidthActualFlat: '120px',
        minWidthActualTextFlat: '120px',
        minWidthActualImageFlat: '120px',
      }
    },
    {
      path: '/pages/CSS/layout/max-width',
      method: 'radioChangeMaxWidth',
      valueIndex: 4,
      styleName: 'max-width',
      expectedValue: {
        maxWidth: '120px',
        maxWidthActual: '120px',
        maxWidthActualText: '120px',
        maxWidthActualImage: '120px',
        maxWidthActualFlat: '120px',
        maxWidthActualTextFlat: '120px',
        maxWidthActualImageFlat: '120px',
      }
    },
    {
      path: '/pages/CSS/layout/height',
      method: 'radioChangeHeight',
      valueIndex: 4,
      styleName: 'height',
      expectedValue: {
        height: '150px',
        heightActual: '150px',
        heightActualText: '150px',
        heightActualImage: '150px',
        heightActualFlat: '150px',
        heightActualTextFlat: '150px',
        heightActualImageFlat: '150px',
      }
    },
    {
      path: '/pages/CSS/layout/min-height',
      method: 'radioChangeMinHeight',
      valueIndex: 3,
      styleName: 'min-height',
      expectedValue: {
        minHeight: '50px',
        minHeightActual: '50px',
        minHeightActualText: '50px',
        minHeightActualImage: '50px',
        minHeightActualFlat: '50px',
        minHeightActualTextFlat: '50px',
        minHeightActualImageFlat: '50px',
      }
    },
    {
      path: '/pages/CSS/layout/max-height',
      method: 'radioChangeMaxHeight',
      valueIndex: 3,
      styleName: 'max-height',
      expectedValue: {
        maxHeight: '100px',
        maxHeightActual: '100px',
        maxHeightActualText: '100px',
        maxHeightActualImage: '100px',
        maxHeightActualFlat: '100px',
        maxHeightActualTextFlat: '100px',
        maxHeightActualImageFlat: '100px',
      }
    },
    {
      path: '/pages/CSS/layout/opacity',
      method: 'radioChangeOpacity',
      valueIndex: 3,
      styleName: 'opacity',
      skipAssert: true,
      expectedValue: {
        opacity: '0.5',
        opacityActual: '0.5',
        opacityActualText: '0.5',
        opacityActualImage: '0.5',
        opacityActualFlat: '0.5',
        opacityActualTextFlat: '0.5',
        opacityActualImageFlat: '0.5',
      }
    },
    {
      path: '/pages/CSS/layout/visibility',
      method: 'radioChangeVisibility',
      valueIndex: 2,
      styleName: 'visibility',
      expectedValue: {
        visibility: 'visible',
        visibilityActual: 'hidden',
        visibilityActualText: 'hidden',
        visibilityActualImage: 'hidden'
      }
    },
    {
      path: '/pages/CSS/layout/top',
      method: 'radioChangeTop',
      valueIndex: 3,
      styleName: 'top',
      expectedValue: {
        top: '10px',
        topActual: '10px',
        topActualText: '10px',
        topActualImage: '10px',
        topActualFlat: '10px',
        topActualTextFlat: '10px',
        topActualImageFlat: '10px',
      }
    },
    {
      path: '/pages/CSS/layout/bottom',
      method: 'radioChangeBottom',
      valueIndex: 3,
      styleName: 'bottom',
      expectedValue: {
        bottom: '10px',
        bottomActual: '10px',
        bottomActualText: '10px',
        bottomActualImage: '10px',
        bottomActualFlat: '10px',
        bottomActualTextFlat: '10px',
        bottomActualImageFlat: '10px',
      }
    },
    {
      path: '/pages/CSS/layout/left',
      method: 'radioChangeLeft',
      valueIndex: 3,
      styleName: 'left',
      expectedValue: {
        left: '10px',
        leftActual: '10px',
        leftActualText: '10px',
        leftActualImage: '10px',
        leftActualFlat: '10px',
        leftActualTextFlat: '10px',
        leftActualImageFlat: '10px',
      }
    },
    {
      path: '/pages/CSS/layout/right',
      method: 'radioChangeRight',
      valueIndex: 3,
      styleName: 'right',
      expectedValue: {
        right: '20px',
        rightActual: '20px',
        rightActualText: '20px',
        rightActualImage: '20px',
        rightActualFlat: '20px',
        rightActualTextFlat: '20px',
        rightActualImageFlat: '20px',
      }
    },
    {
      path: '/pages/CSS/layout/position',
      method: 'radioChangePosition',
      valueIndex: 2,
      styleName: 'position',
      expectedValue: {
        position: 'relative',
        positionActual: 'relative',
        positionActualText: 'relative',
        positionActualImage: 'relative',
      }
    },
    {
      path: '/pages/CSS/layout/z-index',
      method: 'radioChangeZIndex',
      valueIndex: 4,
      styleName: 'z-index',
      skipAssert: true,
      expectedValue: {
        zIndexActual: '10',
        zIndexActualText: '10',
        zIndexActualImage: '10',
      }
    },
    // background
    {
      path: '/pages/CSS/background/background-color',
      method: 'radioChangeBackgroundColor',
      valueIndex: 3,
      styleName: 'background-color',
      skipAssert: true,
      expectedValue: {
        backgroundColor: 'rgb(255, 0, 0)',
        backgroundColorActual: 'rgb(255, 0, 0)',
        backgroundColorActualText: 'rgb(255, 0, 0)',
        backgroundColorActualImage: 'rgb(255, 0, 0)',
        backgroundColorActualFlat: 'rgb(255, 0, 0)',
        backgroundColorActualTextFlat: 'rgb(255, 0, 0)',
        backgroundColorActualImageFlat: 'rgb(255, 0, 0)',
      }
    },
    // border
    {
      path: '/pages/CSS/border/border-bottom',
      method: 'radioChangeBorderBottom',
      valueIndex: 3,
      styleName: 'border-bottom',
      skipAssert: true,
      expectedValue: {
        borderBottom: '2px dashed blue',
        borderBottomActual: '2px dashed blue',
        borderBottomActualText: '2px dashed blue',
        borderBottomActualImage: '2px dashed blue',
        borderBottomActualFlat: '2px dashed blue',
        borderBottomActualTextFlat: '2px dashed blue',
        borderBottomActualImageFlat: '2px dashed blue',
      }
    },
    {
      path: '/pages/CSS/border/border-color',
      method: 'radioChangeBorderColor',
      valueIndex: 2,
      styleName: 'border-color',
      skipAssert: true,
      expectedValue: {
        borderColor: '#ff0000',
        borderColorActual: '#ff0000',
        borderColorActualText: '#ff0000',
        borderColorActualImage: '#ff0000',
        borderColorActualFlat: '#ff0000',
        borderColorActualTextFlat: '#ff0000',
        borderColorActualImageFlat: '#ff0000',
      }
    },
    {
      path: '/pages/CSS/border/border-left',
      method: 'radioChangeBorderLeft',
      valueIndex: 3,
      styleName: 'border-left',
      skipAssert: true,
      expectedValue: {
        borderLeft: '2px dashed blue',
        borderLeftActual: '2px dashed blue',
        borderLeftActualText: '2px dashed blue',
        borderLeftActualImage: '2px dashed blue',
        borderLeftActualFlat: '2px dashed blue',
        borderLeftActualTextFlat: '2px dashed blue',
        borderLeftActualImageFlat: '2px dashed blue',
      }
    },
    {
      path: '/pages/CSS/border/border-radius',
      method: 'radioChangeBorderRadius',
      valueIndex: 2,
      styleName: 'border-radius',
      expectedValue: {
        borderRadius: '5px',
        borderRadiusActualText: '5px',
        borderRadiusActualImage: '5px',
        borderRadiusActualFlat: '5px',
        borderRadiusActualTextFlat: '5px',
        borderRadiusActualImageFlat: '5px',
      }
    },
    {
      path: '/pages/CSS/border/border-right',
      method: 'radioChangeBorderRight',
      valueIndex: 3,
      styleName: 'border-right',
      skipAssert: true,
      expectedValue: {
        borderRight: '2px dashed blue',
        borderRightActual: '2px dashed blue',
        borderRightActualText: '2px dashed blue',
        borderRightActualImage: '2px dashed blue',
        borderRightActualFlat: '2px dashed blue',
        borderRightActualTextFlat: '2px dashed blue',
        borderRightActualImageFlat: '2px dashed blue',
      }
    },
    {
      path: '/pages/CSS/border/border-style',
      method: 'radioChangeBorderStyle',
      valueIndex: 2,
      styleName: 'border-style',
      expectedValue: {
        borderStyleValue: 'solid',
        borderStyleActual: 'solid',
        borderStyleActualText: 'solid',
        borderStyleActualImage: 'solid',
        borderStyleActualFlat: 'solid',
        borderStyleActualTextFlat: 'solid',
        borderStyleActualImageFlat: 'solid',
      }
    },
    {
      path: '/pages/CSS/border/border-top',
      method: 'radioChangeBorderTop',
      valueIndex: 3,
      styleName: 'border-top',
      skipAssert: true,
      expectedValue: {
        borderTop: '2px dashed blue',
        borderTopActual: '2px dashed blue',
        borderTopActualText: '2px dashed blue',
        borderTopActualImage: '2px dashed blue',
        borderTopActualFlat: '2px dashed blue',
        borderTopActualTextFlat: '2px dashed blue',
        borderTopActualImageFlat: '2px dashed blue',
      }
    },
  {
    path: '/pages/CSS/border/border-width',
    method: 'radioChangeBorderWidth',
    valueIndex: 3,
    styleName: 'border-width',
    expectedValue: {
      borderWidth: '3px',
      borderWidthActual: '3px',
      borderWidthActualText: '3px',
      borderWidthActualImage: '3px',
      borderWidthActualFlat: '3px',
      borderWidthActualTextFlat: '3px',
      borderWidthActualImageFlat: '3px',
    }
  },
  // box-shadow
  {
    path: '/pages/CSS/box-shadow/box-shadow',
    method: 'radioChangeBoxShadow',
    valueIndex: 3,
    styleName: 'box-shadow',
    skipAssert: true, // true 时跳过 expectedValue 断言
    expectedValue: {
      boxShadow: '5px 5px 5px black',
      boxShadowActual: 'black 5px 5px 5px',
      boxShadowActualText: 'black 5px 5px 5px',
      boxShadowActualImage: 'black 5px 5px 5px',
      boxShadowActualFlat: 'black 5px 5px 5px',
      boxShadowActualTextFlat: 'black 5px 5px 5px',
      boxShadowActualImageFlat: 'black 5px 5px 5px',
    }
  },
  // display
  {
    path: '/pages/CSS/display/flex',
    method: 'radioChangeDisplay',
    valueIndex: 1,
    styleName: 'display',
    expectedValue: {
      displayActual: 'flex',
      displayActualText: 'flex',
      displayActualImage: 'flex',
    }
  },
  {
    path: '/pages/CSS/display/none',
    method: 'radioChangeDisplay',
    valueIndex: 2,
    styleName: 'display',
    expectedValue: {
      displayActual: 'none',
      displayActualText: 'none',
      displayActualImage: 'none',
    }
  },
  // flex
  {
    path: '/pages/CSS/flex/flex-direction',
    method: 'radioChangeFlexDirection',
    valueIndex: 2,
    styleName: 'flex-direction',
    expectedValue: {
      flexDirection: 'row-reverse',
      flexDirectionActual: 'row-reverse',
      flexDirectionActualFlat: 'row-reverse',
    }
  },
  {
    path: '/pages/CSS/flex/flex-flow',
    method: 'radioChangeFlexFlow',
    valueIndex: 2,
    styleName: 'flex-flow',
    expectedValue: {
      flexFlow: 'row wrap',
      flexFlowActual: 'row wrap',
      flexFlowActualFlat: 'row wrap',
    }
  },
  {
    path: '/pages/CSS/flex/justify-content',
    method: 'radioChangeJustifyContent',
    valueIndex: 3,
    styleName: 'justify-content',
    expectedValue: {
      justifyContent: 'center',
      justifyContentActual: 'center',
      justifyContentActualFlat: 'center',
    }
  },
  {
    path: '/pages/CSS/flex/align-content',
    method: 'radioChangeAlignContent',
    valueIndex: 3,
    styleName: 'align-content',
    expectedValue: {
      alignContent: 'center',
      alignContentActual: 'center',
      alignContentActualFlat: 'center',
    }
  },
  {
    path: '/pages/CSS/flex/align-items',
    method: 'radioChangeAlignItems',
    valueIndex: 3,
    styleName: 'align-items',
    expectedValue: {
      alignItems: 'center',
      alignItemsActual: 'center',
      alignItemsActualFlat: 'center',
    }
  },
  {
    path: '/pages/CSS/flex/flex',
    method: 'radioChangeFlex',
    valueIndex: 2,
    styleName: 'flex',
    expectedValue: {
      flexActual: '1 1 0%',
      flexActualFlat: '1 1 0%',
      flexActualText: '1 1 0%',
      flexActualImage: '1 1 0%',
      flexActualTextFlat: '1 1 0%',
      flexActualImageFlat: '1 1 0%',
    }
  },
  {
    path: '/pages/CSS/flex/flex-basis',
    method: 'radioChangeFlexBasis',
    valueIndex: 3,
    styleName: 'flex-basis',
    expectedValue: {
      flexBasis: '50px',
      flexBasisActual: '50px',
      flexBasisActualFlat: '50px',
      flexBasisActualText: '50px',
      flexBasisActualImage: '50px',
      flexBasisActualTextFlat: '50px',
      flexBasisActualImageFlat: '50px',
    }
  },
  {
    path: '/pages/CSS/flex/flex-grow',
    method: 'radioChangeFlexGrow',
    valueIndex: 3,
    styleName: 'flex-grow',
    expectedValue: {
      flexGrow: '1',
      flexGrowActual: '1',
      flexGrowActualFlat: '1',
      flexGrowActualText: '1',
      flexGrowActualImage: '1',
      flexGrowActualTextFlat: '1',
      flexGrowActualImageFlat: '1',
    }
  },
  {
    path: '/pages/CSS/flex/flex-shrink',
    method: 'radioChangeFlexShrink',
    valueIndex: 2,
    styleName: 'flex-shrink',
    expectedValue: {
      flexShrink: '1',
      flexShrinkActual: '1',
      flexShrinkActualFlat: '1',
      flexShrinkActualText: '1',
      flexShrinkActualImage: '1',
      flexShrinkActualTextFlat: '1',
      flexShrinkActualImageFlat: '1',
    }
  },
  {
    path: '/pages/CSS/flex/align-self',
    method: 'radioChangeAlignSelf',
    valueIndex: 2,
    styleName: 'align-self',
    expectedValue: {
      alignSelf: 'center',
      alignSelfActual: 'center',
      alignSelfActualText: 'center',
      alignSelfActualImage: 'center',
      alignSelfActualFlat: 'center',
      alignSelfActualTextFlat: 'center',
      alignSelfActualImageFlat: 'center',
    }
  },
  {
    path: '/pages/CSS/flex/flex-wrap',
    method: 'radioChangeFlexWrap',
    valueIndex: 2,
    styleName: 'flex-wrap',
    expectedValue: {
      flexWrap: 'wrap',
      flexWrapActual: 'wrap',
      flexWrapActualFlat: 'wrap',
    }
  },
  // margin
  {
    path: '/pages/CSS/margin/margin-auto',
    method: 'radioChangeMargin',
    valueIndex: 3,
    styleName: 'margin',
    skipAssert: false,
    expectedValue: {
      margin: '20px',
      marginActual: '20px',
      marginActualText: '20px',
      marginActualImage: '20px',
      marginActualFlat: '20px',
      marginActualTextFlat: '20px',
      marginActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/margin/margin-bottom',
    method: 'radioChangeMarginBottom',
    valueIndex: 3,
    styleName: 'margin-bottom',
    expectedValue: {
      marginBottom: '20px',
      marginBottomActual: '20px',
      marginBottomActualText: '20px',
      marginBottomActualImage: '20px',
      marginBottomActualFlat: '20px',
      marginBottomActualTextFlat: '20px',
      marginBottomActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/margin/margin-left',
    method: 'radioChangeMarginLeft',
    valueIndex: 3,
    styleName: 'margin-left',
    expectedValue: {
      marginLeft: '20px',
      marginLeftActual: '20px',
      marginLeftActualText: '20px',
      marginLeftActualImage: '20px',
      marginLeftActualFlat: '20px',
      marginLeftActualTextFlat: '20px',
      marginLeftActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/margin/margin-right',
    method: 'radioChangeMarginRight',
    valueIndex: 3,
    styleName: 'margin-right',
    expectedValue: {
      marginRight: '20px',
      marginRightActual: '20px',
      marginRightActualText: '20px',
      marginRightActualImage: '20px',
      marginRightActualFlat: '20px',
      marginRightActualTextFlat: '20px',
      marginRightActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/margin/margin-top',
    method: 'radioChangeMarginTop',
    valueIndex: 3,
    styleName: 'margin-top',
    expectedValue: {
      marginTop: '20px',
      marginTopActual: '20px',
      marginTopActualText: '20px',
      marginTopActualImage: '20px',
      marginTopActualFlat: '20px',
      marginTopActualTextFlat: '20px',
      marginTopActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/margin/margin',
    method: 'radioChangeMargin',
    valueIndex: 3,
    styleName: 'margin',
    expectedValue: {
      margin: '20px',
      marginActual: '20px',
      marginActualText: '20px',
      marginActualImage: '20px',
      marginActualFlat: '20px',
      marginActualTextFlat: '20px',
      marginActualImageFlat: '20px',
      marginActualScrollView: '20px'
    }
  },
  // padding
  {
    path: '/pages/CSS/padding/padding-bottom',
    method: 'radioChangePaddingBottom',
    valueIndex: 3,
    styleName: 'padding-bottom',
    expectedValue: {
      paddingBottom: '40px',
      paddingBottomActual: '40px',
      paddingBottomActualText: '40px',
      paddingBottomActualImage: '40px',
      paddingBottomActualFlat: '40px',
      paddingBottomActualTextFlat: '40px',
      paddingBottomActualImageFlat: '40px',
    }
  },
  {
    path: '/pages/CSS/padding/padding-left',
    method: 'radioChangePaddingLeft',
    valueIndex: 3,
    styleName: 'padding-left',
    expectedValue: {
      paddingLeft: '20px',
      paddingLeftActual: '20px',
      paddingLeftActualText: '20px',
      paddingLeftActualImage: '20px',
      paddingLeftActualFlat: '20px',
      paddingLeftActualTextFlat: '20px',
      paddingLeftActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/padding/padding-right',
    method: 'radioChangePaddingRight',
    valueIndex: 3,
    styleName: 'padding-right',
    expectedValue: {
      paddingRight: '20px',
      paddingRightActual: '20px',
      paddingRightActualText: '20px',
      paddingRightActualImage: '20px',
      paddingRightActualFlat: '20px',
      paddingRightActualTextFlat: '20px',
      paddingRightActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/padding/padding-top',
    method: 'radioChangePaddingTop',
    valueIndex: 3,
    styleName: 'padding-top',
    expectedValue: {
      paddingTop: '20px',
      paddingTopActual: '20px',
      paddingTopActualText: '20px',
      paddingTopActualImage: '20px',
      paddingTopActualFlat: '20px',
      paddingTopActualTextFlat: '20px',
      paddingTopActualImageFlat: '20px',
    }
  },
  {
    path: '/pages/CSS/padding/padding',
    method: 'radioChangePadding',
    valueIndex: 3,
    styleName: 'padding',
    expectedValue: {
      padding: '10px',
      paddingActual: '10px',
      paddingActualText: '10px',
      paddingActualImage: '10px',
      paddingActualFlat: '10px',
      paddingActualTextFlat: '10px',
      paddingActualImageFlat: '10px',
      paddingActualScrollView: '10px',
    }
  },
  // text
  {
    path: '/pages/CSS/text/text-align',
    method: 'radioChangeTextAlign',
    valueIndex: 2,
    styleName: 'text-align',
    expectedValue: {
      textAlign: 'center',
      textAlignActual: 'center',
      textAlignActualFlat: 'center',
    }
  },
  {
    path: '/pages/CSS/text/color',
    method: 'radioChangeColor',
    valueIndex: 2,
    styleName: 'color',
    skipAssert: true, // true 时跳过 expectedValue 断言
    expectedValue: {
      color: '#942192',
      colorActual: 'rgb(148, 33, 146)',
      colorActualFlat: 'rgb(148, 33, 146)',
    }
  },
  {
    path: '/pages/CSS/text/font-weight',
    method: 'radioChangeFontWeight',
    valueIndex: 4,
    styleName: 'font-weight',
    expectedValue: {
      fontWeight: '500',
      fontWeightActual: '500',
      fontWeightActualFlat: '500',
    }
  },
  {
    path: '/pages/CSS/text/text-decoration-line',
    method: 'radioChangeTextDecorationLine',
    valueIndex: 2,
    styleName: 'text-decoration-line',
    expectedValue: {
      textDecorationLine: 'underline',
      textDecorationLineActual: 'underline',
      textDecorationLineActualFlat: 'underline',
    }
  },
  {
    path: '/pages/CSS/text/text-overflow',
    method: 'radioChangeTextOverflow',
    valueIndex: 2,
    styleName: 'text-overflow',
    expectedValue: {
      textOverflow: 'ellipsis',
      textOverflowActual: 'ellipsis',
      textOverflowActualFlat: 'ellipsis',
    }
  },
  {
    path: '/pages/CSS/text/text-shadow',
    method: 'radioChangeTextShadow',
    valueIndex: 3,
    styleName: 'text-shadow',
    skipAssert: true, // true 时跳过 expectedValue 断言
    expectedValue: {
      textShadow: '5px 5px #558abb',
      textShadowActual: 'rgb(85, 138, 187) 5px 5px',
      textShadowActualFlat: 'rgb(85, 138, 187) 5px 5px',
    }
  },
  {
    path: '/pages/CSS/text/white-space',
    method: 'radioChangeWhiteSpace',
    valueIndex: 3,
    styleName: 'white-space',
    expectedValue: {
      whiteSpace: 'pre',
      whiteSpaceActual: 'pre',
      whiteSpaceActualFlat: 'pre',
    }
  },
  {
    path: '/pages/CSS/text/font-style',
    method: 'radioChangeFontStyle',
    valueIndex: 2,
    styleName: 'font-style',
    expectedValue: {
      fontStyle: 'italic',
      fontStyleActual: 'italic',
      fontStyleActualFlat: 'italic',
    }
  },
  // transition
  {
    path: '/pages/CSS/transition/transition-delay',
    method: 'radioChangeTransitionDelay',
    valueIndex: 3,
    styleName: 'transition-delay',
    expectedValue: {
      transitionDelayActual: '1s',
      transitionDelayActualText: '1s',
      transitionDelayActualImage: '1s',
    }
  },
  {
    path: '/pages/CSS/transition/transition-timing-function',
    method: 'radioChangeTransitionTimingFunction',
    valueIndex: 3,
    styleName: 'transition-timing-function',
    skipAssert: true,
    expectedValue: {
      transitionTimingFunctionActual: 'ease-out',
      transitionTimingFunctionActualText: 'ease-out',
      transitionTimingFunctionActualImage: 'ease-out',
    }
  },
]

// 固定的测试选择器
const testSelectors = [
  '.test-view',
  '.test-text',
  '.test-image',
  '.test-view-flatten',
  '.test-text-flatten',
  '.test-image-flatten'
]

// 通过环境变量 TEST_PATH 过滤，只跑指定页面，例如：
// TEST_PATH=/pages/CSS/margin/margin npx jest set-css.test.js

const overrideMap = TEST_OVERRIDE
  ? Object.fromEntries(TEST_OVERRIDE.map(o => [o.path, o]))
  : null;
const overridePaths = overrideMap ? Object.keys(overrideMap) : null;

const filterPath = process.env.TEST_PATH;
const filteredTests = (filterPath
  ? cssTests.filter(t => t.path === filterPath)
  : overridePaths
    ? cssTests.filter(t => overridePaths.includes(t.path))
    : cssTests
).map(t => overrideMap?.[t.path] ? { ...t, ...overrideMap[t.path] } : t);

// 将测试配置分批
const BATCH_SIZE = 15;
const cssTestBatches = [];
for (let i = 0; i < filteredTests.length; i += BATCH_SIZE) {
  cssTestBatches.push(filteredTests.slice(i, i + BATCH_SIZE));
}

// 为每个批次创建独立的测试套件
cssTestBatches.forEach((batch, batchIndex) => {
  // console.log('batch',batch)
  console.log('batchIndex',batchIndex)
  describe(`CSS setProperty Batch ${batchIndex + 1}`, () => {
    beforeAll(async () => {
      console.log(`Starting CSS batch ${batchIndex + 1} with ${batch.length} tests`);
    });

    afterAll(async () => {
      console.log(`Finished CSS batch ${batchIndex + 1}`);
    });

    test.each(batch)("%s", async (testCase) => {
      console.log(`Testing: ${testCase.path}`);

      // 1. 打开页面
      const page = await program.reLaunch(testCase.path);
      await page.waitFor(3000);

      // 2. 调用方法并截图
      await page.callMethod(testCase.method, testCase.valueIndex);
      await page.waitFor(100);

      const image = await program.screenshot({ fullPage: true });
      expect(image).toSaveImageSnapshot({
        customSnapshotIdentifier() {
          return `__set-css-test__/${testCase.path.replace(/\//g, "-").substring(1)}`
        }
      });

      // 3. 断言 getPropertyValue 值
      const afterData = await page.data('data');
      console.log('afterData', afterData)

      if (!testCase.skipAssert) {
        const errors = [];
        const softExpect = (received, expected, key) => {
          try {
            expect(received).toBe(expected);
          } catch (e) {
            errors.push(`  ${key}: expected "${expected}", received "${received}"`);
          }
        };

        if (typeof testCase.expectedValue === 'object') {
          for (const [key, val] of Object.entries(testCase.expectedValue)) {
            softExpect(afterData[key], val, key);
          }
        } else {
          const received = afterData[testCase.styleName + 'Actual'] ?? afterData[testCase.styleName];
          softExpect(received, testCase.expectedValue, testCase.styleName);
        }

        if (errors.length > 0) {
          throw new Error(`[ASSERT FAILED] ${testCase.path}\n${errors.join('\n')}`);
        }
      }

      await page.waitFor(500);
    });
  });
});
