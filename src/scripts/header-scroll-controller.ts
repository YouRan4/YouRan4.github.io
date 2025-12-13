/**
 * 头部滚动控制器（收缩效果）
 * 遵循 Astro 最佳实践与现代 JavaScript 模式
 */

interface HeaderState {
  ticking: boolean
  lastScrollY: number
  elements: {
    wrapper: HTMLElement | null
    inner: HTMLElement | null
  }
}

interface HeaderControllerConfig {
  scrollThreshold: number
  desktopBreakpoint: number
  headerIds: {
    wrapper: string
    inner: string
  }
}

/**
 * 初始化头部滚动控制器
 * @param config - 控制器的配置对象
 */
export function initHeaderScrollController(config: HeaderControllerConfig): void {
  if (typeof window === 'undefined') return

  const { scrollThreshold, desktopBreakpoint, headerIds } = config

  // 状态管理
  let state: HeaderState = {
    ticking: false,
    lastScrollY: 0,
    elements: {
      wrapper: null,
      inner: null,
    },
  }

  /**
   * 从 DOM 获取头部元素
   * @returns 元素对象；若未找到返回 null
   */
  const getElements = (): { wrapper: HTMLElement; inner: HTMLElement } | null => {
    const wrapper = document.getElementById(headerIds.wrapper)
    const inner = document.getElementById(headerIds.inner)

    if (!wrapper || !inner) {
      return null
    }

    return { wrapper, inner }
  }

  /**
   * 检查当前视口是否为桌面尺寸
   * @returns 桌面返回 true，否则返回 false
   */
  const isDesktop = (): boolean => {
    return window.innerWidth >= desktopBreakpoint
  }

  /**
   * 根据滚动位置更新头部的收缩状态
   */
  const updateHeaderState = (): void => {
    const elements = getElements()
    if (!elements) {
      state.ticking = false
      return
    }

    const { wrapper, inner } = elements
    const currentScroll = window.scrollY
    const isScrolled = currentScroll > scrollThreshold
    const wasScrolled = state.lastScrollY > scrollThreshold

    // 移动端/平板上重置收缩状态
    if (!isDesktop()) {
      wrapper.classList.remove('shrink')
      inner.classList.remove('shrink')
      state.ticking = false
      state.lastScrollY = currentScroll
      return
    }

    // 在桌面端应用收缩效果
    if (isScrolled && !wasScrolled) {
      wrapper.classList.add('shrink')
      inner.classList.add('shrink')
    } else if (!isScrolled && wasScrolled) {
      wrapper.classList.remove('shrink')
      inner.classList.remove('shrink')
    }

    state.lastScrollY = currentScroll
    state.ticking = false
  }

  /**
   * 使用 requestAnimationFrame 的节流滚动处理器
   */
  const handleScroll = (): void => {
    if (!state.ticking) {
      window.requestAnimationFrame(updateHeaderState)
      state.ticking = true
    }
  }

  /**
   * 初始化头部控制器
   */
  const init = (): void => {
    // 重置状态
    state.ticking = false
    state.lastScrollY = window.scrollY
    const elements = getElements()
    state.elements = elements || { wrapper: null, inner: null }

    // 初次状态更新
    updateHeaderState()

    // 绑定滚动事件监听
    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  /**
   * 清理头部控制器
   */
  const cleanup = (): void => {
    // 移除事件监听
    window.removeEventListener('scroll', handleScroll)

    // 重置收缩状态
    const elements = getElements()
    if (elements) {
      elements.wrapper.classList.remove('shrink')
      elements.inner.classList.remove('shrink')
    }

    // 重置状态
    state.ticking = false
    state.lastScrollY = 0
    state.elements = { wrapper: null, inner: null }
  }

  // Astro 导航事件处理
  document.addEventListener('astro:page-load', init)
  document.addEventListener('astro:after-swap', () => {
    cleanup()
    // 使用 requestAnimationFrame 替代 setTimeout 以获得更好性能
    requestAnimationFrame(() => {
      requestAnimationFrame(init)
    })
  })
  document.addEventListener('astro:before-swap', cleanup)

  // 首次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}
