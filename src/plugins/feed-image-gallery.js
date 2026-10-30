// Group consecutive images in feed posts into a 3-column grid (max 9 per grid),
// mimicking WeChat Moments. Blog posts are left untouched.
const GALLERY_SIZE = 9;

const isBlankText = (node) => node.type === 'text' && node.value.trim() === '';

const onlyMeaningfulChild = (node) => {
  const children = (node.children || []).filter((child) => !isBlankText(child));
  return children.length === 1 ? children[0] : null;
};

// Returns the image (or the link wrapping it) when the paragraph only contains
// a single image, e.g. `<p><img /></p>` or `<p><a><img /></a></p>`.
const getMedia = (node) => {
  if (!node || node.type !== 'element' || node.tagName !== 'p') return null;

  const child = onlyMeaningfulChild(node);
  if (!child || child.type !== 'element') return null;
  if (child.tagName === 'img') return child;

  if (child.tagName === 'a') {
    const inner = onlyMeaningfulChild(child);
    if (inner && inner.type === 'element' && inner.tagName === 'img') {
      return child;
    }
  }

  return null;
};

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
});

const groupImages = (parent) => {
  if (!Array.isArray(parent.children)) return;

  const nextChildren = [];
  let items = [];

  const flush = () => {
    for (let i = 0; i < items.length; i += GALLERY_SIZE) {
      nextChildren.push(createGallery(items.slice(i, i + GALLERY_SIZE)));
    }
    items = [];
  };

  for (const child of parent.children) {
    const media = getMedia(child);

    if (media) {
      items.push(media);
      continue;
    }

    flush();
    nextChildren.push(child);
    if (child.type === 'element') {
      groupImages(child);
    }
  }

  flush();
  parent.children = nextChildren;
};

export function feedImageGallery() {
  return (tree, file) => {
    const source = file?.path || file?.history?.[0] || '';
    // Only apply to the feed collection.
    if (!/(^|[/\\])content[/\\]feed[/\\]/.test(source)) return;
    groupImages(tree);
  };
}
