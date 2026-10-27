jest.setTimeout(50000);
const isVapor = process.env.UNI_APP_X_DOM2 === "true"
const platformInfo = (process.env.uniTestPlatformInfo || '').toLocaleLowerCase()
const isHarmony = platformInfo.includes('harmony')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const currentPlatform = isWeb ? 'web' : (isMP ? 'mp' : 'app')
const currentMode = isVapor ? 'dom2' : `dom1-${currentPlatform}`

describe('set css', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  // skipAssert: true, 时跳过 expectedValue 断言

  // 调试用：临时覆盖某些页面的测试参数，不需要时置为 null
  // 可以写多个页面，例如只跑 color 相关的页面：
  const TEST_OVERRIDE = null

  // dom1 和 dom2 断言一致的页面
  const sharedCssTests = [
    {
      path: "/pages/CSS/layout/width",
      method: "radioChangeWidth",
      valueIndex: 3,
      styleName: "width",
      expectedValue: {
        width: "50px",
        widthActual: "50px",
        widthActualText: "50px",
        widthActualImage: "50px",
        widthActualFlat: "50px",
        widthActualTextFlat: "50px",
        widthActualImageFlat: "50px"
      }
    },
    {
      path: "/pages/CSS/layout/min-width",
      method: "radioChangeMinWidth",
      valueIndex: 4,
      styleName: "min-width",
      expectedValue: {
        minWidth: "120px",
        minWidthActual: "120px",
        minWidthActualText: "120px",
        minWidthActualImage: "120px",
        minWidthActualFlat: "120px",
        minWidthActualTextFlat: "120px",
        minWidthActualImageFlat: "120px"
      }
    },
    {
      path: "/pages/CSS/layout/max-width",
      method: "radioChangeMaxWidth",
      valueIndex: 4,
      styleName: "max-width",
      expectedValue: {
        maxWidth: "120px",
        maxWidthActual: "120px",
        maxWidthActualText: "120px",
        maxWidthActualImage: "120px",
        maxWidthActualFlat: "120px",
        maxWidthActualTextFlat: "120px",
        maxWidthActualImageFlat: "120px"
      }
    },
    {
      path: "/pages/CSS/layout/height",
      method: "radioChangeHeight",
      valueIndex: 4,
      styleName: "height",
      expectedValue: {
        height: "150px",
        heightActual: "150px",
        heightActualText: "150px",
        heightActualImage: "150px",
        heightActualFlat: "150px",
        heightActualTextFlat: "150px",
        heightActualImageFlat: "150px"
      }
    },
    {
      path: "/pages/CSS/layout/min-height",
      method: "radioChangeMinHeight",
      valueIndex: 3,
      styleName: "min-height",
      expectedValue: {
        minHeight: "50px",
        minHeightActual: "50px",
        minHeightActualText: "50px",
        minHeightActualImage: "50px",
        minHeightActualFlat: "50px",
        minHeightActualTextFlat: "50px",
        minHeightActualImageFlat: "50px"
      }
    },
    {
      path: "/pages/CSS/layout/max-height",
      method: "radioChangeMaxHeight",
      valueIndex: 3,
      styleName: "max-height",
      expectedValue: {
        maxHeight: "100px",
        maxHeightActual: "100px",
        maxHeightActualText: "100px",
        maxHeightActualImage: "100px",
        maxHeightActualFlat: "100px",
        maxHeightActualTextFlat: "100px",
        maxHeightActualImageFlat: "100px"
      }
    },
    {
      path: "/pages/CSS/layout/visibility",
      method: "radioChangeVisibility",
      valueIndex: 2,
      styleName: "visibility",
      expectedValue: {
        visibility: "visible",
        visibilityActual: "hidden",
        visibilityActualText: "hidden",
        visibilityActualImage: "hidden"
      }
    },
    {
      path: "/pages/CSS/layout/top",
      method: "radioChangeTop",
      valueIndex: 3,
      styleName: "top",
      expectedValue: {
        top: "10px",
        topActual: "10px",
        topActualText: "10px",
        topActualImage: "10px",
        topActualFlat: "10px",
        topActualTextFlat: "10px",
        topActualImageFlat: "10px"
      }
    },
    {
      path: "/pages/CSS/layout/bottom",
      method: "radioChangeBottom",
      valueIndex: 3,
      styleName: "bottom",
      expectedValue: {
        bottom: "10px",
        bottomActual: "10px",
        bottomActualText: "10px",
        bottomActualImage: "10px",
        bottomActualFlat: "10px",
        bottomActualTextFlat: "10px",
        bottomActualImageFlat: "10px"
      }
    },
    {
      path: "/pages/CSS/layout/left",
      method: "radioChangeLeft",
      valueIndex: 3,
      styleName: "left",
      expectedValue: {
        left: "10px",
        leftActual: "10px",
        leftActualText: "10px",
        leftActualImage: "10px",
        leftActualFlat: "10px",
        leftActualTextFlat: "10px",
        leftActualImageFlat: "10px"
      }
    },
    {
      path: "/pages/CSS/layout/right",
      method: "radioChangeRight",
      valueIndex: 3,
      styleName: "right",
      expectedValue: {
        right: "20px",
        rightActual: "20px",
        rightActualText: "20px",
        rightActualImage: "20px",
        rightActualFlat: "20px",
        rightActualTextFlat: "20px",
        rightActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/layout/position",
      method: "radioChangePosition",
      valueIndex: 2,
      styleName: "position",
      expectedValue: {
        position: "relative",
        positionActual: "relative",
        positionActualText: "relative",
        positionActualImage: "relative"
      }
    },
    {
      path: "/pages/CSS/border/border-style",
      method: "radioChangeBorderStyle",
      valueIndex: 2,
      styleName: "border-style",
      expectedValue: {
        borderStyleValue: "solid",
        borderStyleActual: "solid",
        borderStyleActualText: "solid",
        borderStyleActualImage: "solid",
        borderStyleActualFlat: "solid",
        borderStyleActualTextFlat: "solid",
        borderStyleActualImageFlat: "solid"
      }
    },
    {
      path: "/pages/CSS/border/border-width",
      method: "radioChangeBorderWidth",
      valueIndex: 3,
      styleName: "border-width",
      expectedValue: {
        borderWidth: "3px",
        borderWidthActual: "3px",
        borderWidthActualText: "3px",
        borderWidthActualImage: "3px",
        borderWidthActualFlat: "3px",
        borderWidthActualTextFlat: "3px",
        borderWidthActualImageFlat: "3px"
      }
    },
    {
      path: "/pages/CSS/box-sizing/box-sizing",
      method: "radioChangeBoxSizing",
      valueIndex: 2,
      styleName: "box-sizing",
      expectedValue: {
        boxSizing: "border-box",
        boxSizingActual: "border-box",
        boxSizingActualText: "border-box",
        boxSizingActualImage: "border-box",
        boxSizingActualFlat: "border-box",
        boxSizingActualTextFlat: "border-box",
        boxSizingActualImageFlat: "border-box"
      }
    },
    {
      path: "/pages/CSS/display/flex",
      method: "radioChangeDisplay",
      valueIndex: 1,
      styleName: "display",
      expectedValue: {
        displayActual: "flex",
        displayActualText: "flex",
        displayActualImage: "flex"
      }
    },
    {
      path: "/pages/CSS/display/none",
      method: "radioChangeDisplay",
      valueIndex: 2,
      styleName: "display",
      expectedValue: {
        displayActual: "none",
        displayActualText: "none",
        displayActualImage: "none"
      }
    },
    {
      path: "/pages/CSS/flex/flex-direction",
      method: "radioChangeFlexDirection",
      valueIndex: 2,
      styleName: "flex-direction",
      expectedValue: {
        flexDirection: "row-reverse",
        flexDirectionActual: "row-reverse",
        flexDirectionActualFlat: "row-reverse"
      }
    },
    {
      path: "/pages/CSS/flex/justify-content",
      method: "radioChangeJustifyContent",
      valueIndex: 3,
      styleName: "justify-content",
      expectedValue: {
        justifyContent: "center",
        justifyContentActual: "center",
        justifyContentActualFlat: "center"
      }
    },
    {
      path: "/pages/CSS/flex/align-content",
      method: "radioChangeAlignContent",
      valueIndex: 3,
      styleName: "align-content",
      expectedValue: {
        alignContent: "center",
        alignContentActual: "center",
        alignContentActualFlat: "center"
      }
    },
    {
      path: "/pages/CSS/flex/align-items",
      method: "radioChangeAlignItems",
      valueIndex: 3,
      styleName: "align-items",
      expectedValue: {
        alignItems: "center",
        alignItemsActual: "center",
        alignItemsActualFlat: "center"
      }
    },
    {
      path: "/pages/CSS/flex/flex-basis",
      method: "radioChangeFlexBasis",
      valueIndex: 3,
      styleName: "flex-basis",
      expectedValue: {
        flexBasis: "50px",
        flexBasisActual: "50px",
        flexBasisActualFlat: "50px",
        flexBasisActualText: "50px",
        flexBasisActualImage: "50px",
        flexBasisActualTextFlat: "50px",
        flexBasisActualImageFlat: "50px"
      }
    },
    {
      path: "/pages/CSS/flex/flex-grow",
      method: "radioChangeFlexGrow",
      valueIndex: 3,
      styleName: "flex-grow",
      expectedValue: {
        flexGrow: "1",
        flexGrowActual: "1",
        flexGrowActualFlat: "1",
        flexGrowActualText: "1",
        flexGrowActualImage: "1",
        flexGrowActualTextFlat: "1",
        flexGrowActualImageFlat: "1"
      }
    },
    {
      path: "/pages/CSS/flex/flex-shrink",
      method: "radioChangeFlexShrink",
      valueIndex: 2,
      styleName: "flex-shrink",
      expectedValue: {
        flexShrink: "1",
        flexShrinkActual: "1",
        flexShrinkActualFlat: "1",
        flexShrinkActualText: "1",
        flexShrinkActualImage: "1",
        flexShrinkActualTextFlat: "1",
        flexShrinkActualImageFlat: "1"
      }
    },
    {
      path: "/pages/CSS/flex/align-self",
      method: "radioChangeAlignSelf",
      valueIndex: 2,
      styleName: "align-self",
      expectedValue: {
        alignSelf: "center",
        alignSelfActual: "center",
        alignSelfActualText: "center",
        alignSelfActualImage: "center",
        alignSelfActualFlat: "center",
        alignSelfActualTextFlat: "center",
        alignSelfActualImageFlat: "center"
      }
    },
    {
      path: "/pages/CSS/flex/flex-wrap",
      method: "radioChangeFlexWrap",
      valueIndex: 2,
      styleName: "flex-wrap",
      expectedValue: {
        flexWrap: "wrap",
        flexWrapActual: "wrap",
        flexWrapActualFlat: "wrap"
      }
    },
    {
      path: "/pages/CSS/margin/margin-bottom",
      method: "radioChangeMarginBottom",
      valueIndex: 3,
      styleName: "margin-bottom",
      expectedValue: {
        marginBottom: "20px",
        marginBottomActual: "20px",
        marginBottomActualText: "20px",
        marginBottomActualImage: "20px",
        marginBottomActualFlat: "20px",
        marginBottomActualTextFlat: "20px",
        marginBottomActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/margin/margin-left",
      method: "radioChangeMarginLeft",
      valueIndex: 3,
      styleName: "margin-left",
      expectedValue: {
        marginLeft: "20px",
        marginLeftActual: "20px",
        marginLeftActualText: "20px",
        marginLeftActualImage: "20px",
        marginLeftActualFlat: "20px",
        marginLeftActualTextFlat: "20px",
        marginLeftActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/margin/margin-right",
      method: "radioChangeMarginRight",
      valueIndex: 3,
      styleName: "margin-right",
      expectedValue: {
        marginRight: "20px",
        marginRightActual: "20px",
        marginRightActualText: "20px",
        marginRightActualImage: "20px",
        marginRightActualFlat: "20px",
        marginRightActualTextFlat: "20px",
        marginRightActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/margin/margin-top",
      method: "radioChangeMarginTop",
      valueIndex: 3,
      styleName: "margin-top",
      expectedValue: {
        marginTop: "20px",
        marginTopActual: "20px",
        marginTopActualText: "20px",
        marginTopActualImage: "20px",
        marginTopActualFlat: "20px",
        marginTopActualTextFlat: "20px",
        marginTopActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/padding/padding-bottom",
      method: "radioChangePaddingBottom",
      valueIndex: 3,
      styleName: "padding-bottom",
      expectedValue: {
        paddingBottom: "40px",
        paddingBottomActual: "40px",
        paddingBottomActualText: "40px",
        paddingBottomActualImage: "40px",
        paddingBottomActualFlat: "40px",
        paddingBottomActualTextFlat: "40px",
        paddingBottomActualImageFlat: "40px"
      }
    },
    {
      path: "/pages/CSS/padding/padding-left",
      method: "radioChangePaddingLeft",
      valueIndex: 3,
      styleName: "padding-left",
      expectedValue: {
        paddingLeft: "20px",
        paddingLeftActual: "20px",
        paddingLeftActualText: "20px",
        paddingLeftActualImage: "20px",
        paddingLeftActualFlat: "20px",
        paddingLeftActualTextFlat: "20px",
        paddingLeftActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/padding/padding-right",
      method: "radioChangePaddingRight",
      valueIndex: 3,
      styleName: "padding-right",
      expectedValue: {
        paddingRight: "20px",
        paddingRightActual: "20px",
        paddingRightActualText: "20px",
        paddingRightActualImage: "20px",
        paddingRightActualFlat: "20px",
        paddingRightActualTextFlat: "20px",
        paddingRightActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/padding/padding-top",
      method: "radioChangePaddingTop",
      valueIndex: 3,
      styleName: "padding-top",
      expectedValue: {
        paddingTop: "20px",
        paddingTopActual: "20px",
        paddingTopActualText: "20px",
        paddingTopActualImage: "20px",
        paddingTopActualFlat: "20px",
        paddingTopActualTextFlat: "20px",
        paddingTopActualImageFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/text/text-align",
      method: "radioChangeTextAlign",
      valueIndex: 2,
      styleName: "text-align",
      expectedValue: {
        textAlign: "center",
        textAlignActual: "center",
        textAlignActualFlat: "center"
      }
    },
    {
      path: "/pages/CSS/text/font-family",
      method: "radioChangeFontFamily",
      valueIndex: 5,
      styleName: "font-family",
      expectedValue: {
        fontFamily: "UniFontFamily",
        fontFamilyActual: "UniFontFamily",
        fontFamilyActualFlat: "UniFontFamily"
      }
    },
    {
      path: "/pages/CSS/text/font-size",
      method: "radioChangeFontSize",
      valueIndex: 4,
      styleName: "font-size",
      expectedValue: {
        fontSizeProp: "20px",
        fontSizeActual: "20px",
        fontSizeActualFlat: "20px"
      }
    },
    {
      path: "/pages/CSS/text/font-weight",
      method: "radioChangeFontWeight",
      valueIndex: 4,
      styleName: "font-weight",
      expectedValue: {
        fontWeight: "200",
        fontWeightActual: "200",
        fontWeightActualFlat: "200"
      }
    },
    {
      path: "/pages/CSS/text/text-decoration-line",
      method: "radioChangeTextDecorationLine",
      valueIndex: 2,
      styleName: "text-decoration-line",
      expectedValue: {
        textDecorationLine: "underline",
        textDecorationLineActual: "underline",
        textDecorationLineActualFlat: "underline"
      }
    },
    {
      path: "/pages/CSS/text/text-overflow",
      method: "radioChangeTextOverflow",
      valueIndex: 2,
      styleName: "text-overflow",
      expectedValue: {
        textOverflow: "ellipsis",
        textOverflowActual: "ellipsis",
        textOverflowActualFlat: "ellipsis"
      }
    },
    {
      path: "/pages/CSS/text/letter-spacing",
      method: "radioChangeLetterSpacing",
      valueIndex: 5,
      styleName: "letter-spacing",
      expectedValue: {
        letterSpacing: "5px",
        letterSpacingActual: "5px",
        letterSpacingActualFlat: "5px"
      }
    },
    {
      path: "/pages/CSS/text/line-height",
      method: "radioChangeLineHeight",
      valueIndex: 3,
      styleName: "line-height",
      expectedValue: {
        lineHeight: "25px",
        lineHeightActual: "25px",
        lineHeightActualFlat: "25px"
      }
    },
    {
      path: "/pages/CSS/text/white-space",
      method: "radioChangeWhiteSpace",
      valueIndex: 3,
      styleName: "white-space",
      expectedValue: {
        whiteSpace: "pre",
        whiteSpaceActual: "pre",
        whiteSpaceActualFlat: "pre"
      }
    },
    {
      path: "/pages/CSS/text/font-style",
      method: "radioChangeFontStyle",
      valueIndex: 2,
      styleName: "font-style",
      expectedValue: {
        fontStyle: "italic",
        fontStyleActual: "italic",
        fontStyleActualFlat: "italic"
      }
    },
    {
      path: "/pages/CSS/transform/rotate",
      method: "radioChangeTransform",
      valueIndex: 3,
      styleName: "transform",
      expectedValue: {
        transformValueDynamic: "rotate(90deg)",
        transformActual: "rotate(90deg)",
        transformActualText: "rotate(90deg)",
        transformActualImage: "rotate(90deg)",
        transformActualFlat: "rotate(90deg)",
        transformActualTextFlat: "rotate(90deg)",
        transformActualImageFlat: "rotate(90deg)"
      }
    },
    {
      path: "/pages/CSS/transform/transform-origin",
      method: "radioChangeTransformOrigin",
      valueIndex: 6,
      styleName: "transform-origin",
      expectedValue: {
        transformOrigin: "10px 10px",
        transformOriginActual: "10px 10px",
        transformOriginActualText: "10px 10px",
        transformOriginActualImage: "10px 10px",
        transformOriginActualFlat: "10px 10px",
        transformOriginActualTextFlat: "10px 10px",
        transformOriginActualImageFlat: "10px 10px"
      }
    },
    {
      path: "/pages/CSS/transform/translate",
      method: "radioChangeTransform",
      valueIndex: 4,
      styleName: "transform",
      expectedValue: {
        transformValueDynamic: "translate(50px, 50px)",
        transformActual: "translate(50px, 50px)",
        transformActualText: "translate(50px, 50px)",
        transformActualImage: "translate(50px, 50px)",
        transformActualFlat: "translate(50px, 50px)",
        transformActualTextFlat: "translate(50px, 50px)",
        transformActualImageFlat: "translate(50px, 50px)"
      }
    },
    {
      path: "/pages/CSS/transition/transition-delay",
      method: "radioChangeTransitionDelay",
      valueIndex: 3,
      styleName: "transition-delay",
      expectedValue: {
        transitionDelayActual: "1s",
        transitionDelayActualText: "1s",
        transitionDelayActualImage: "1s"
      }
    }
  ]

  // dom1 和 dom2 断言存在差异或已知不稳定的页面
  const splitCssTests = [
    {
      path: "/pages/CSS/layout/opacity",
      method: "radioChangeOpacity",
      valueIndex: 3,
      styleName: "opacity",
      expectdom2: {
        expectedValue: {
          opacity: "0.5",
          opacityActual: "0.5",
          opacityActualText: "0.5",
          opacityActualImage: "0.5",
          opacityActualFlat: "0.5",
          opacityActualTextFlat: "0.5",
          opacityActualImageFlat: "0.5"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            opacity: "0.5",
            opacityActual: "0.5",
            opacityActualText: "0.5",
            opacityActualImage: "0.5",
            opacityActualFlat: "0.5",
            opacityActualTextFlat: "0.5",
            opacityActualImageFlat: "0.5"
          }
        }
      }
    },
    {
      path: "/pages/CSS/layout/z-index",
      method: "radioChangeZIndex",
      valueIndex: 4,
      styleName: "z-index",
      expectdom2: {
        expectedValue: {
          zIndexActual: "10",
          zIndexActualText: "10",
          zIndexActualImage: "10"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            zIndexActual: "10",
            zIndexActualText: "10",
            zIndexActualImage: "10"
          }
        },
        mp: {
          expectedValue: {
            zIndexActual: 10,
            zIndexActualText: "10",
            zIndexActualImage: "10"
          }
        }
      }
    },
    {
      path: "/pages/CSS/background/background-color",
      method: "radioChangeBackgroundColor",
      valueIndex: 3,
      styleName: "background-color",
      expectdom2: {
        expectedValue: {
          backgroundColor: "#00f8",
          backgroundColorActual: "rgba(0, 0, 255, 0.53)",
          backgroundColorActualText: "rgba(0, 0, 255, 0.53)",
          backgroundColorActualImage: "rgba(0, 0, 255, 0.53)",
          backgroundColorActualFlat: "rgba(0, 0, 255, 0.53)",
          backgroundColorActualTextFlat: "rgba(0, 0, 255, 0.53)",
          backgroundColorActualImageFlat: "rgba(0, 0, 255, 0.53)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
              backgroundColor: "#00f8",
              backgroundColorActual: "#00f8",
              backgroundColorActualText: "#00f8",
              backgroundColorActualImage: "#00f8",
              backgroundColorActualFlat: "#00f8",
              backgroundColorActualTextFlat: "#00f8",
              backgroundColorActualImageFlat: "#00f8"
          }
        },
        web: {
          expectedValue: {
              backgroundColor: "#00f8",
              backgroundColorActual: "rgba(0, 0, 255, 0.533)",
              backgroundColorActualText: "rgba(0, 0, 255, 0.533)",
              backgroundColorActualImage: "rgba(0, 0, 255, 0.533)",
              backgroundColorActualFlat: "rgba(0, 0, 255, 0.533)",
              backgroundColorActualTextFlat: "rgba(0, 0, 255, 0.533)",
              backgroundColorActualImageFlat: "rgba(0, 0, 255, 0.533)"
          }
        }
      }
    },
    {
      path: "/pages/CSS/border/border",
      method: "radioChangeBorder",
      valueIndex: 3,
      styleName: "border",
      expectdom2: {
        expectedValue: {
          border: "2px dashed blue",
          borderActual: "2px dashed rgb(0, 0, 255)",
          borderActualText: "2px dashed rgb(0, 0, 255)",
          borderActualImage: "2px dashed rgb(0, 0, 255)",
          borderActualFlat: "2px dashed rgb(0, 0, 255)",
          borderActualTextFlat: "2px dashed rgb(0, 0, 255)",
          borderActualImageFlat: "2px dashed rgb(0, 0, 255)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            border: "2px dashed blue",
            borderActual: "2px dashed blue",
            borderActualText: "2px dashed blue",
            borderActualImage: "2px dashed blue",
            borderActualFlat: "2px dashed blue",
            borderActualTextFlat: "2px dashed blue",
            borderActualImageFlat: "2px dashed blue"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/border/border-radius",
      method: "radioChangeBorderRadius",
      valueIndex: 2,
      styleName: "border-radius",
      expectdom2: {
        expectedValue: {
          borderRadius: "5px",
          borderRadiusActualText: "5px",
          borderRadiusActualImage: "5px",
          borderRadiusActualFlat: "5px",
          borderRadiusActualTextFlat: "5px",
          borderRadiusActualImageFlat: "5px"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            borderRadius: "5px",
            borderRadiusActualText: "5px",
            borderRadiusActualImage: "5px",
            borderRadiusActualFlat: "5px",
            borderRadiusActualTextFlat: "5px",
            borderRadiusActualImageFlat: "5px"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/border/border-color",
      method: "radioChangeBorderColor",
      valueIndex: 2,
      styleName: "border-color",
      expectdom2: {
        expectedValue: {
          borderColor: "#0000ff",
          borderColorActual: "rgb(0, 0, 255)",
          borderColorActualText: "rgb(0, 0, 255)",
          borderColorActualImage: "rgb(0, 0, 255)",
          borderColorActualFlat: "rgb(0, 0, 255)",
          borderColorActualTextFlat: "rgb(0, 0, 255)",
          borderColorActualImageFlat: "rgb(0, 0, 255)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            borderColor: "#0000ff",
            borderColorActual: "#0000ff",
            borderColorActualText: "#0000ff",
            borderColorActualImage: "#0000ff",
            borderColorActualFlat: "#0000ff",
            borderColorActualTextFlat: "#0000ff",
            borderColorActualImageFlat: "#0000ff"
          }
        },
        web: {
          expectedValue: {
            borderColor: "#0000ff",
            borderColorActual: "rgb(0, 0, 255)",
            borderColorActualText: "rgb(0, 0, 255)",
            borderColorActualImage: "rgb(0, 0, 255)",
            borderColorActualFlat: "rgb(0, 0, 255)",
            borderColorActualTextFlat: "rgb(0, 0, 255)",
            borderColorActualImageFlat: "rgb(0, 0, 255)"
          }
        }
      }
    },
    {
      path: "/pages/CSS/border/border-top",
      method: "radioChangeBorderTop",
      valueIndex: 3,
      styleName: "border-top",
      expectdom2: {
        expectedValue: {
          borderTop: "2px dashed blue",
          borderTopActual: "2px dashed rgb(0, 0, 255)",
          borderTopActualText: "2px dashed rgb(0, 0, 255)",
          borderTopActualImage: "2px dashed rgb(0, 0, 255)",
          borderTopActualFlat: "2px dashed rgb(0, 0, 255)",
          borderTopActualTextFlat: "2px dashed rgb(0, 0, 255)",
          borderTopActualImageFlat: "2px dashed rgb(0, 0, 255)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            borderTop: "2px dashed blue",
            borderTopActual: "2px dashed blue",
            borderTopActualText: "2px dashed blue",
            borderTopActualImage: "2px dashed blue",
            borderTopActualFlat: "2px dashed blue",
            borderTopActualTextFlat: "2px dashed blue",
            borderTopActualImageFlat: "2px dashed blue"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/border/border-bottom",
      method: "radioChangeBorderBottom",
      valueIndex: 3,
      styleName: "border-bottom",
      expectdom2: {
        expectedValue: {
          borderBottom: "2px dashed blue",
          borderBottomActual: "2px dashed rgb(0, 0, 255)",
          borderBottomActualText: "2px dashed rgb(0, 0, 255)",
          borderBottomActualImage: "2px dashed rgb(0, 0, 255)",
          borderBottomActualFlat: "2px dashed rgb(0, 0, 255)",
          borderBottomActualTextFlat: "2px dashed rgb(0, 0, 255)",
          borderBottomActualImageFlat: "2px dashed rgb(0, 0, 255)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            borderBottom: "2px dashed blue",
            borderBottomActual: "2px dashed blue",
            borderBottomActualText: "2px dashed blue",
            borderBottomActualImage: "2px dashed blue",
            borderBottomActualFlat: "2px dashed blue",
            borderBottomActualTextFlat: "2px dashed blue",
            borderBottomActualImageFlat: "2px dashed blue"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/border/border-left",
      method: "radioChangeBorderLeft",
      valueIndex: 3,
      styleName: "border-left",
      expectdom2: {
        expectedValue: {
          borderLeft: "2px dashed blue",
          borderLeftActual: "2px dashed rgb(0, 0, 255)",
          borderLeftActualText: "2px dashed rgb(0, 0, 255)",
          borderLeftActualImage: "2px dashed rgb(0, 0, 255)",
          borderLeftActualFlat: "2px dashed rgb(0, 0, 255)",
          borderLeftActualTextFlat: "2px dashed rgb(0, 0, 255)",
          borderLeftActualImageFlat: "2px dashed rgb(0, 0, 255)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            borderLeft: "2px dashed blue",
            borderLeftActual: "2px dashed blue",
            borderLeftActualText: "2px dashed blue",
            borderLeftActualImage: "2px dashed blue",
            borderLeftActualFlat: "2px dashed blue",
            borderLeftActualTextFlat: "2px dashed blue",
            borderLeftActualImageFlat: "2px dashed blue"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/border/border-right",
      method: "radioChangeBorderRight",
      valueIndex: 3,
      styleName: "border-right",
      expectdom2: {
        expectedValue: {
          borderRight: "2px dashed blue",
          borderRightActual: "2px dashed rgb(0, 0, 255)",
          borderRightActualText: "2px dashed rgb(0, 0, 255)",
          borderRightActualImage: "2px dashed rgb(0, 0, 255)",
          borderRightActualFlat: "2px dashed rgb(0, 0, 255)",
          borderRightActualTextFlat: "2px dashed rgb(0, 0, 255)",
          borderRightActualImageFlat: "2px dashed rgb(0, 0, 255)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            borderRight: "2px dashed blue",
            borderRightActual: "2px dashed blue",
            borderRightActualText: "2px dashed blue",
            borderRightActualImage: "2px dashed blue",
            borderRightActualFlat: "2px dashed blue",
            borderRightActualTextFlat: "2px dashed blue",
            borderRightActualImageFlat: "2px dashed blue"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/box-shadow/box-shadow",
      method: "radioChangeBoxShadow",
      valueIndex: 3,
      styleName: "box-shadow",
      expectdom2: {
        expectedValue: {
          boxShadow: "5px 5px 5px black",
          boxShadowActual: "5px 5px 5px rgb(0, 0, 0)",
          boxShadowActualText: "5px 5px 5px rgb(0, 0, 0)",
          boxShadowActualImage: "5px 5px 5px rgb(0, 0, 0)",
          boxShadowActualFlat: "5px 5px 5px rgb(0, 0, 0)",
          boxShadowActualTextFlat: "5px 5px 5px rgb(0, 0, 0)",
          boxShadowActualImageFlat: "5px 5px 5px rgb(0, 0, 0)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            boxShadow: "5px 5px 5px black",
            boxShadowActual: "5px 5px 5px black",
            boxShadowActualText: "5px 5px 5px black",
            boxShadowActualImage: "5px 5px 5px black",
            boxShadowActualFlat: "5px 5px 5px black",
            boxShadowActualTextFlat: "5px 5px 5px black",
            boxShadowActualImageFlat: "5px 5px 5px black"
          }
        },
        web: {
          expectedValue: {
            boxShadow: "5px 5px 5px black",
            boxShadowActual: "black 5px 5px 5px",
            boxShadowActualText: "black 5px 5px 5px",
            boxShadowActualImage: "black 5px 5px 5px",
            boxShadowActualFlat: "black 5px 5px 5px",
            boxShadowActualTextFlat: "black 5px 5px 5px",
            boxShadowActualImageFlat: "black 5px 5px 5px"
          }
        }
      }
    },
    {
      path: "/pages/CSS/flex/flex-flow",
      method: "radioChangeFlexFlow",
      valueIndex: 2,
      styleName: "flex-flow",
      expectdom2: {
        expectedValue: {
          flexFlow: "row wrap",
          flexFlowActual: "row wrap",
          flexFlowActualFlat: "row wrap"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            flexFlow: "row wrap",
            flexFlowActual: "row wrap",
            flexFlowActualFlat: "row wrap"
          }
        },
        harmony: {
          skipAssert: true
        },
        web: {
          expectedValue: {
            flexFlow: "row wrap",
            flexFlowActual: "wrap",
            flexFlowActualFlat: "wrap"
          }
        }
      }
    },
    {
      path: "/pages/CSS/flex/flex",
      method: "radioChangeFlex",
      valueIndex: 2,
      styleName: "flex",
      expectdom2: {
        expectedValue: {
          flexActual: "1 1 0%",
          flexActualFlat: "1 1 0%",
          flexActualText: "1 1 0%",
          flexActualImage: "1 1 0%",
          flexActualTextFlat: "1 1 0%",
          flexActualImageFlat: "1 1 0%"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            flexActual: "1",
            flexActualFlat: "1",
            flexActualText: "1",
            flexActualImage: "1",
            flexActualTextFlat: "1",
            flexActualImageFlat: "1"
          }
        },
        harmony: {
          skipAssert: true
        },
        web: {
          expectedValue: {
            flexActual: "1 1 0%",
            flexActualFlat: "1 1 0%",
            flexActualText: "1 1 0%",
            flexActualImage: "1 1 0%",
            flexActualTextFlat: "1 1 0%",
            flexActualImageFlat: "1 1 0%"
          }
        }
      }
    },
    {
      path: "/pages/CSS/margin/margin-auto",
      method: "radioChangeMargin",
      valueIndex: 3,
      styleName: "margin",
      expectdom2: {
        expectedValue: {
          margin: "20px",
          marginActual: "20px",
          marginActualText: "20px",
          marginActualImage: "20px",
          marginActualFlat: "20px",
          marginActualTextFlat: "20px",
          marginActualImageFlat: "20px"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            margin: "20px",
            marginActual: "20px",
            marginActualText: "20px",
            marginActualImage: "20px",
            marginActualFlat: "20px",
            marginActualTextFlat: "20px",
            marginActualImageFlat: "20px"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/margin/margin",
      method: "radioChangeMargin",
      valueIndex: 3,
      styleName: "margin",
      expectdom2: {
        expectedValue: {
          margin: "20px",
          marginActual: "20px",
          marginActualText: "20px",
          marginActualImage: "20px",
          marginActualFlat: "20px",
          marginActualTextFlat: "20px",
          marginActualImageFlat: "20px",
          marginActualScrollView: "20px"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            margin: "20px",
            marginActual: "20px",
            marginActualText: "20px",
            marginActualImage: "20px",
            marginActualFlat: "20px",
            marginActualTextFlat: "20px",
            marginActualImageFlat: "20px",
            marginActualScrollView: "20px"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/padding/padding",
      method: "radioChangePadding",
      valueIndex: 3,
      styleName: "padding",
      expectdom2: {
        expectedValue: {
          padding: "10px",
          paddingActual: "10px",
          paddingActualText: "10px",
          paddingActualImage: "10px",
          paddingActualFlat: "10px",
          paddingActualTextFlat: "10px",
          paddingActualImageFlat: "10px",
          paddingActualScrollView: "10px"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            padding: "10px",
            paddingActual: "10px",
            paddingActualText: "10px",
            paddingActualImage: "10px",
            paddingActualFlat: "10px",
            paddingActualTextFlat: "10px",
            paddingActualImageFlat: "10px",
            paddingActualScrollView: "10px"
          }
        },
        harmony: {
          skipAssert: true
        }
      }
    },
    {
      path: "/pages/CSS/text/color",
      method: "radioChangeColor",
      valueIndex: 2,
      styleName: "color",
      expectdom2: {
        expectedValue: {
          color: "#942192",
          colorActual: "rgb(148, 33, 146)",
          colorActualFlat: "rgb(148, 33, 146)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            color: "#942192",
            colorActual: "#942192",
            colorActualFlat: "#942192"
          }
        },
        web: {
          expectedValue: {
            color: "#942192",
            colorActual: "rgb(148, 33, 146)",
            colorActualFlat: "rgb(148, 33, 146)"
          }
        }
      }
    },
    {
      path: "/pages/CSS/text/text-shadow",
      method: "radioChangeTextShadow",
      valueIndex: 3,
      styleName: "text-shadow",
      expectdom2: {
        expectedValue: {
          textShadow: "5px 5px #558abb",
          textShadowActual: "5px 5px 0px rgb(85, 138, 187)",
          textShadowActualFlat: "5px 5px 0px rgb(85, 138, 187)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            textShadow: "5px 5px #558abb",
            textShadowActual: "5px 5px #558abb",
            textShadowActualFlat: "5px 5px #558abb"
          }
        },
        harmony: {
          skipAssert: true
        },
        web: {
          expectedValue: {
            textShadow: "5px 5px #558abb",
            textShadowActual: "rgb(85, 138, 187) 5px 5px",
            textShadowActualFlat: "rgb(85, 138, 187) 5px 5px"
          }
        }
      }
    },
    {
      path: "/pages/CSS/transform/scale",
      method: "radioChangeTransform",
      valueIndex: 2,
      styleName: "transform",
      expectdom2: {
        expectedValue: {
          transformValueDynamic: "scale(0.5,0.5)",
          transformActual: "scale(0.5, 0.5)",
          transformActualText: "scale(0.5, 0.5)",
          transformActualImage: "scale(0.5, 0.5)",
          transformActualFlat: "scale(0.5, 0.5)",
          transformActualTextFlat: "scale(0.5, 0.5)",
          transformActualImageFlat: "scale(0.5, 0.5)"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            transformValueDynamic: "scale(0.5,0.5)",
            transformActual: "scale(0.5,0.5)",
            transformActualText: "scale(0.5,0.5)",
            transformActualImage: "scale(0.5,0.5)",
            transformActualFlat: "scale(0.5,0.5)",
            transformActualTextFlat: "scale(0.5,0.5)",
            transformActualImageFlat: "scale(0.5,0.5)"
          }
        },
        web: {
          expectedValue: {
            transformValueDynamic: "scale(0.5,0.5)",
            transformActual: "scale(0.5, 0.5)",
            transformActualText: "scale(0.5, 0.5)",
            transformActualImage: "scale(0.5, 0.5)",
            transformActualFlat: "scale(0.5, 0.5)",
            transformActualTextFlat: "scale(0.5, 0.5)",
            transformActualImageFlat: "scale(0.5, 0.5)"
          }
        }
      }
    },
    {
      path: "/pages/CSS/transition/transition-timing-function",
      method: "radioChangeTransitionTimingFunction",
      valueIndex: 3,
      styleName: "transition-timing-function",
      expectdom2: {
        expectedValue: {
          transitionTimingFunctionActual: "ease-out",
          transitionTimingFunctionActualText: "ease-out",
          transitionTimingFunctionActualImage: "ease-out"
        }
      },
      expectdom1: {
        base: {
          expectedValue: {
            transitionTimingFunctionActual: "ease-out",
            transitionTimingFunctionActualText: "ease-out",
            transitionTimingFunctionActualImage: "ease-out"
          }
        }
      }
    }
  ]

  const cssTests = [...sharedCssTests, ...splitCssTests]

  const getDom1Config = (testCase) => {
    const dom1Config = testCase.expectdom1 ?? {}
    const baseConfig = dom1Config.base ?? {
      skipAssert: false,
      expectedValue: {}
    }
    const platformConfig = isHarmony ?
      dom1Config.harmony :
      (currentPlatform === 'web' ?
        dom1Config.web :
        (currentPlatform === 'mp' ? dom1Config.mp : dom1Config.app))
    return {
      skipAssert: platformConfig?.skipAssert ?? baseConfig.skipAssert ?? false,
      expectedValue: {
        ...(baseConfig.expectedValue ?? {}),
        ...(platformConfig?.expectedValue ?? {})
      }
    }
  }

  const getAssertConfig = (testCase) => {
    if ('expectedValue' in testCase) {
      return {
        skipAssert: testCase.skipAssert ?? false,
        expectedValue: testCase.expectedValue ?? {}
      }
    }
    if (isVapor) {
      const dom2Config = testCase.expectdom2 ?? {}
      return {
        skipAssert: dom2Config.skipAssert ?? false,
        expectedValue: dom2Config.expectedValue ?? {}
      }
    }
    return getDom1Config(testCase)
  }

  const stringifyLogData = (value) => {
    try {
      return JSON.stringify(value)
    } catch (e) {
      return String(value)
    }
  }

  const waitForExpectedValue = async (page, expectedValue, label, timeout = 3000, interval = 100) => {
    const entries = Object.entries(expectedValue ?? {})
    if (entries.length === 0) {
      return
    }

    const start = Date.now()
    while (Date.now() - start < timeout) {
      const afterData = await page.data('data')
      if (entries.every(([key, value]) => afterData[key] === value)) {
        return
      }
      await page.waitFor(interval)
    }

    const afterData = await page.data('data')
    throw new Error(`[WAIT FAILED] ${label}\nexpected ${stringifyLogData(expectedValue)}\nreceived ${stringifyLogData(afterData)}`)
  }

  const mergeOverride = (testCase, override) => {
    if ('expectedValue' in testCase || 'expectedValue' in override) {
      return {
        ...testCase,
        ...override
      }
    }
    return {
      ...testCase,
      ...override,
      expectdom2: {
        ...(testCase.expectdom2 ?? {}),
        ...(override.expectdom2 ?? {})
      },
      expectdom1: {
        ...(testCase.expectdom1 ?? {}),
        ...(override.expectdom1 ?? {}),
        base: {
          ...(testCase.expectdom1?.base ?? {}),
          ...(override.expectdom1?.base ?? {})
        },
        app: {
          ...(testCase.expectdom1?.app ?? {}),
          ...(override.expectdom1?.app ?? {})
        },
        web: {
          ...(testCase.expectdom1?.web ?? {}),
          ...(override.expectdom1?.web ?? {})
        },
        mp: {
          ...(testCase.expectdom1?.mp ?? {}),
          ...(override.expectdom1?.mp ?? {})
        },
        harmony: {
          ...(testCase.expectdom1?.harmony ?? {}),
          ...(override.expectdom1?.harmony ?? {})
        }
      }
    }
  }

  const overrideMap = TEST_OVERRIDE ?
    Object.fromEntries(TEST_OVERRIDE.map(o => [o.path, o])) :
    null
  const overridePaths = overrideMap ? Object.keys(overrideMap) : null

  const filterPath = process.env.TEST_PATH;
  const filteredTests = (filterPath ?
    cssTests.filter(t => t.path === filterPath) :
    overridePaths ?
    cssTests.filter(t => overridePaths.includes(t.path)) :
    cssTests
  ).map(t => overrideMap?.[t.path] ? mergeOverride(t, overrideMap[t.path]) : t);

  const BATCH_SIZE = 15;
  const cssTestBatches = [];
  for (let i = 0; i < filteredTests.length; i += BATCH_SIZE) {
    cssTestBatches.push(filteredTests.slice(i, i + BATCH_SIZE));
  }

  cssTestBatches.forEach((batch, batchIndex) => {
    describe(`CSS setProperty compatible ${currentMode} Batch ${batchIndex + 1}`, () => {
      beforeAll(async () => {
        // console.log(`Starting CSS compatible ${currentMode} batch ${batchIndex + 1} with ${batch.length} tests`);
      });

      afterAll(async () => {
        // console.log(`Finished CSS compatible ${currentMode} batch ${batchIndex + 1}`);
      });

      test.each(batch)("%s", async (testCase) => {
        // console.log(`Testing: ${testCase.path}`);

        const page = await program.reLaunch(testCase.path);
        await page.waitFor(3000);

        const assertConfig = getAssertConfig(testCase)

        await page.callMethod(testCase.method, testCase.valueIndex);
        if (!assertConfig.skipAssert) {
          await waitForExpectedValue(page, assertConfig.expectedValue, `${testCase.path} (${currentMode})`);
        }
        await page.waitFor(100);

        const image = await program.screenshot({
          fullPage: true
        });
        expect(image).toSaveImageSnapshot({
          customSnapshotIdentifier() {
            return `__set-css__/${currentMode}/${testCase.path.replace(/\//g, "-").substring(1)}`
          }
        });

        const afterData = await page.data('data');
        const expectedValue = assertConfig.expectedValue ?? {}
        console.log(`[getPropertyValue] ${testCase.path} (${currentMode}) ${stringifyLogData(afterData)}`);

        if (!assertConfig.skipAssert) {
          const errors = [];
          const softExpect = (received, expected, key) => {
            try {
              expect(received).toBe(expected);
            } catch (e) {
              errors.push(`  ${key}: expected "${expected}", received "${received}"`);
            }
          };

          if (typeof expectedValue === 'object') {
            for (const [key, val] of Object.entries(expectedValue)) {
              softExpect(afterData[key], val, key);
            }
          } else {
            const received = afterData[testCase.styleName + 'Actual'] ?? afterData[testCase.styleName];
            softExpect(received, expectedValue, testCase.styleName);
          }

          if (errors.length > 0) {
            throw new Error(`[ASSERT FAILED] ${testCase.path} (${currentMode})\n${errors.join("\n")}`);
          }
        }

        await page.waitFor(500);
      });
    });
  });
})

