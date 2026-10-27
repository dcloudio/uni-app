
export type PageStyleItem = {
  key : string
  type : string
  value : Array<any>
}

export const PageStyleArray = [
  {
    key: "navigationBarBackgroundColor",
    type: "string",
    value: ["#007AFF", "#FFFFFF", "#000000"]
  },
  {
    key: "navigationBarTextStyle",
    type: "string",
    value: ["white", "black"]
  },
  {
    key: "navigationBarTitleText",
    type: "string",
    value: ["dialogPage", "title2", "title3"]
  },
  {
    key: "navigationStyle",
    type: "string",
    value: ["default", "custom"]
  },
  {
    key: "backgroundColor",
    type: "string",
    value: ["#FFFFFF", "#000000"]
  },
  {
    key: "backgroundColorContent",
    type: "string",
    value: ["#FFFFFF", "transparent", "#000000"]
  },
  {
    key: "backgroundTextStyle",
    type: "string",
    value: ["dark", "light"]
  },
  {
    key: "enablePullDownRefresh",
    type: "boolean",
    value: [true, false]
  },
  {
    key: "onReachBottomDistance",
    type: "number",
    value: [50, 100]
  },
  {
    key: "pageOrientation",
    type: "string",
    value: ["auto", "portrait", "landscape"]
  },
  {
    key: "backgroundColorTop",
    type: "string",
    value: ["#FFFFFF", "#000000"]
  },
  {
    key: "backgroundColorBottom",
    type: "string",
    value: ["#FFFFFF", "#000000"]
  },
  {
    key: "navigationBarAutoBackButton",
    type: "boolean",
    value: [true, false]
  },
  {
    key: "hideStatusBar",
    type: "boolean",
    value: [true, false]
  },
  {
    key: "hideBottomNavigationIndicator",
    type: "boolean",
    value: [true, false]
  }] as PageStyleItem[]
