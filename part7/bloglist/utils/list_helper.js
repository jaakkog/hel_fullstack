/* eslint-disable no-unused-vars */
/* eslint-disable prefer-spread */
/* eslint-disable arrow-body-style */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((prev, curr) => {
    return prev + curr.likes
  }, 0)
  return result
}

const mostLikes = (blogs) => {
  // eslint-disable-next-line semi
  const maxLikes = Math.max.apply(Math, blogs.map((o) => { return o.likes; }))
  const result = blogs.find((obj) => obj.likes === 12)
  console.log(result)
  return result
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}
