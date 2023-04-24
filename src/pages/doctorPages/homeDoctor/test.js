const arrLink = [{ content: 'Home', url: '' }]

const location = 'doctor/schedule-timing'
let currentLink = ''

const crumbs = location.split('/').forEach((crumb, index) => {
  currentLink += `/${crumb}`
  if (index !== 0) {
    let content = crumb.split('-').join(' ')
    arrLink.push({ content: content, url: currentLink })
  }
})

console.log(arrLink)
