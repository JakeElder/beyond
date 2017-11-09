import defaults from 'defaults'

export const videoPropsWithDefaults = props => defaults(props, {
  id: 's0m31d',
  publishedAt: new Date().toString(),
  title: 'Some Video',
  thumbnail: 'https://lorempixel.com/400/200',
  description: 'A video and that',
  link: '/videos/s0m31d'
})
