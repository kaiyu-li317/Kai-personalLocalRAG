import { ref, onBeforeUnmount, computed } from 'vue'
import { darkTheme } from 'naive-ui'
import { enUS, dateEnUS } from 'naive-ui'
import { THEME_COLOR_KEY, DEFAULT_THEME_COLOR, TEME_NAVIGATION_KEY, DEFAULT_THEME_NAVIGATION } from '@/libs/enum'
import { localRead, modifyColorAlpha, similarColors } from '@/libs/tools'
import EventBus from '@/libs/eventbus'
export const useTheme = () => {
  const primaryColor = ref(localRead(THEME_COLOR_KEY) || DEFAULT_THEME_COLOR)
  const themeOverrides = computed(() => {
    let colors = similarColors(primaryColor.value, 3, 50)
    return {
      common: {
        // 精致暗色主题配色
        bodyColor: '#09090b',
        cardColor: '#18181b',
        modalColor: '#18181b',
        popoverColor: '#27272a',
        tableColor: '#18181b',
        borderColor: '#27272a',
        dividerColor: '#27272a',
        inputColor: '#27272a',
        actionColor: '#27272a',
        hoverColor: '#27272a',
        tableHeaderColor: '#18181b',
        pressedColor: '#3f3f46',
        // 主题色
        primaryColor: primaryColor.value,
        primaryColorHover: colors[0],
        primaryColorPressed: colors[1],
        primaryColorSuppl: colors[2],
        primaryColorOpacity1: modifyColorAlpha(primaryColor.value, 0.82),
        primaryColorOpacity2: modifyColorAlpha(primaryColor.value, 0.72),
        primaryColorOpacity3: modifyColorAlpha(primaryColor.value, 0.38),
        primaryColorOpacity4: modifyColorAlpha(primaryColor.value, 0.24),
        primaryColorOpacity5: modifyColorAlpha(primaryColor.value, 0.14),
        // 文字颜色
        textColorBase: '#fafafa',
        textColor1: '#fafafa',
        textColor2: '#a1a1aa',
        textColor3: '#71717a',
        // 圆角
        borderRadius: '8px',
        borderRadiusSmall: '6px',
        // 字体
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      },
      Button: {
        borderRadiusMedium: '8px',
        borderRadiusSmall: '6px',
        heightMedium: '36px',
        fontSizeMedium: '14px',
        paddingMedium: '0 16px'
      },
      Card: {
        borderRadius: '12px',
        paddingMedium: '20px',
        borderColor: '#27272a'
      },
      Input: {
        borderRadius: '8px',
        heightMedium: '40px',
        color: '#27272a',
        border: '1px solid #3f3f46',
        borderHover: '1px solid #52525b',
        borderFocus: '1px solid ' + primaryColor.value
      },
      Menu: {
        borderRadius: '8px',
        itemColorActive: modifyColorAlpha(primaryColor.value, 0.15),
        itemColorActiveHover: modifyColorAlpha(primaryColor.value, 0.2)
      },
      Tag: {
        borderRadius: '6px'
      },
      Dialog: {
        borderRadius: '16px',
        padding: '24px'
      }
    }
  })
  // 强制使用暗色主题
  const themeType = ref(darkTheme)

  const naviType = ref(localRead(TEME_NAVIGATION_KEY) || DEFAULT_THEME_NAVIGATION)
  const onNaviTypeChange = (type) => {
    naviType.value = type
  }

  const onThemeColorChange = (color) => {
    primaryColor.value = color
  }
  EventBus.on('on-theme-color-change', onThemeColorChange)
  EventBus.on('on-theme-navigation-change', onNaviTypeChange)
  onBeforeUnmount(() => {
    EventBus.off('on-theme-color-change', onThemeColorChange)
    EventBus.off('on-theme-navigation-change', onNaviTypeChange)
  })
  return {
    themeOverrides, themeType, naviType, enUS, dateEnUS
  }
}
