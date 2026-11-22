/**
 * 把文章里的 ```mermaid 代码块渲染成图表。
 * mermaid 体积较大，只有页面中确实存在图表时才会按需加载。
 */

type Diagram = {
  el: HTMLElement
  source: string
}

// Expressive Code 会把代码块拆成多行 DOM，文本里不再保留换行，需要按行重新拼接。
const codeBlocks = Array.from(
  document.querySelectorAll<HTMLElement>('pre[data-language="mermaid"]'),
)

if (codeBlocks.length > 0) {
  const diagrams: Diagram[] = []

  for (const pre of codeBlocks) {
    const lines = Array.from(pre.querySelectorAll<HTMLElement>('.ec-line')).map(
      (line) => line.textContent ?? '',
    )
    const source = lines.length > 0 ? lines.join('\n') : pre.textContent ?? ''
    const wrapper = pre.closest('.expressive-code') ?? pre
    const container = document.createElement('div')
    container.className = 'mermaid-diagram'
    wrapper.replaceWith(container)
    diagrams.push({ el: container, source })
  }

  const currentTheme = () =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'default'

  const { default: mermaid } = await import('mermaid')

  const render = async () => {
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme(),
      securityLevel: 'loose',
      fontFamily: 'inherit',
    })

    for (const { el, source } of diagrams) {
      el.removeAttribute('data-processed')
      el.textContent = source
    }

    await mermaid.run({ nodes: diagrams.map(({ el }) => el) })
  }

  await render()

  let lastTheme = currentTheme()
  new MutationObserver(() => {
    const nextTheme = currentTheme()
    if (nextTheme === lastTheme) return
    lastTheme = nextTheme
    void render()
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
}

export {}
