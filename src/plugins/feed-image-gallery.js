// 把 feed 中连续的图片段落合并成三列网格（最多 9 张），类似朋友圈。
// 普通文章不受影响。
const GALLERY_SIZE = 9

const isBlankText = (node) => node.type === 'text' && node.value.trim() === ''

const onlyMeaningfulChild = (node) => {
  const children = (node.children || []).filter((child) => !isBlankText(child))
  return children.length === 1 ? children[0] : null
}

// 找出只包含一张图片的段落：<p><img /></p> 或 <p><a><img /></a></p>
const getMedia = (node) => {
  if (!node || node.type !== 'element' || node.tagName !== 'p') return null

  const child = onlyMeaningfulChild(node)
  if (!child || child.type !== 'element') return null
  if (child.tagName === 'img') return child

  if (child.tagName === 'a') {
    const inner = onlyMeaningfulChild(child)
    if (inner && inner.type === 'element' && inner.tagName === 'img') {
      return child
    }
  }

  return null
}

const createGallery = (items) => ({
  type: 'element',
  tagName: 'div',
  properties: { className: ['feed-image-grid'] },
  children: items.map((media) => ({
    type: 'element',
    tagName: 'div',
    properties: { className: ['feed-image-item'] },
    children: [media],
  })),
})

const groupImages = (parent) => {
  if (!Array.isArray(parent.children)) return

  const nextChildren = []
  let items = []

  const flush = () => {
    for (let i = 0; i < items.length; i += GALLERY_SIZE) {
      nextChildren.push(createGallery(items.slice(i, i + GALLERY_SIZE)))
    }
    items = []
  }

  for (const child of parent.children) {
    const media = getMedia(child)

    if (media) {
      items.push(media)
      continue
    }

    flush()
    nextChildren.push(child)
    if (child.type === 'element') {
      groupImages(child)
    }
  }

  flush()
  parent.children = nextChildren
}

export function feedImageGallery() {
  return (tree, file) => {
    const source = file?.path || file?.history?.[0] || ''
    if (!/(^|[/\\])content[/\\]feed[/\\]/.test(source)) return
    groupImages(tree)
  }
}
