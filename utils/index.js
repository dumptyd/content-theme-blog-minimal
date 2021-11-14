const POST_ITEM_FIELDS = ['createdAtFormattedShort', 'href', 'title', 'description'];

export const getPosts = async $content => {
  const posts = await $content('posts').sortBy('createdAt', 'desc').only(POST_ITEM_FIELDS).fetch();
  return posts;
};

export const getTags = async $content => {
  const posts = await $content('posts').only(['tags']).fetch();
  // get a list of unique tags
  const tags = [];
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tags.find(existingTag => existingTag.slug === tag.slug)) return;
      tags.push(tag);
    });
  });

  const getPostCountByTag = tag => posts.filter(post => !!post.tags.find(postTag => postTag.slug === tag.slug)).length;
  const ret = tags.map(tag => ({
    ...tag,
    postCount: getPostCountByTag(tag)
  }));
  ret.sort((tag1, tag2) => tag2.postCount - tag1.postCount);
  return ret;
};

export const getCategories = async $content => {
  const posts = await $content('posts').only(['category']).fetch();
  // get a list of unique categories
  const categories = [];
  posts.forEach(({ category }) => {
    if (!category.slug) return;
    if (categories.find(existingCategory => existingCategory.slug === category.slug)) return;
    categories.push(category);
  });

  const getPostCountByCategory = category => posts.filter(post => post.category && post.category.slug === category.slug).length;
  const ret = categories.map(category => ({
    ...category,
    postCount: getPostCountByCategory(category)
  }));
  ret.sort((category1, category2) => category2.postCount - category1.postCount);
  return ret;
};

export const getPostsByTag = async ($content, tagSlug) => {
  const posts = await $content('posts').only(POST_ITEM_FIELDS).where({ 'tags.slug': { $contains: tagSlug } }).fetch();
  return posts;
};

export const getPostsByCategory = async ($content, categorySlug) => {
  const posts = await $content('posts').only(POST_ITEM_FIELDS).where({ 'category.slug': { $eq: categorySlug } }).fetch();
  return posts;
};

export const hasTags = async ($content) => {
  const posts = await $content('posts').only(['tags']).fetch();
  return posts.some(post => !!post.tags.length);
};

export const hasCategories = async ($content) => {
  const posts = await $content('posts').only(['category']).fetch();
  return posts.some(post => !!(post.category && post.category.slug));
};
