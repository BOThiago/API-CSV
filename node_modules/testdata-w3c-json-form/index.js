var cases = []

cases.push({
  name: 'basic keys',
  fields: [
    { key: 'name', value: 'Bender' },
    { key: 'hind', value: 'Bitable' },
    { key: 'shiny', value: 'Yes' }
  ],
  expected: {
    name: 'Bender',
    hind: 'Bitable',
    shiny: 'Yes'
  }
})

cases.push({
  name: 'multiple values',
  fields: [
    { key: 'bottle-on-wall', value: '1' },
    { key: 'bottle-on-wall', value: '2' },
    { key: 'bottle-on-wall', value: '3' }
  ],
  expected: {
    'bottle-on-wall': ['1', '2', '3']
  }
})

cases.push({
  name: 'deeper structure',
  fields: [
    { key: 'pet[species]', value: 'Dahut' },
    { key: 'pet[name]', value: 'Hypatia' },
    { key: 'kids[1]', value: 'Thelma' },
    { key: 'kids[0]', value: 'Ashley' }
  ],
  expected: {
    pet: {
      species: 'Dahut',
      name: 'Hypatia'
    },
    kids: ['Ashley', 'Thelma']
  }
})

var heartbeat = []
heartbeat[0] = 'thunk'
heartbeat[2] = 'thunk'
cases.push({
  name: 'sparse arrays',
  fields: [
    { key: 'heartbeat[0]', value: 'thunk' },
    { key: 'heartbeat[2]', value: 'thunk' }
  ],
  expected: {
    heartbeat: heartbeat
  }
})

cases.push({
  name: 'even deeper',
  fields: [
    { key: 'pet[0][species]', value: 'Dahut' },
    { key: 'pet[0][name]', value: 'Hypatia' },
    { key: 'pet[1][species]', value: 'Felis Stultus' },
    { key: 'pet[1][name]', value: 'Billie' }
  ],
  expected: {
    pet: [{
      species: 'Dahut',
      name: 'Hypatia'
    }, {
      species: 'Felis Stultus',
      name: 'Billie'
    }]
  }
})

var deep = []
deep[3] = { much: { power: { '!': 'Amaze' } } }
cases.push({
  name: 'such deep',
  fields: [
    { key: 'wow[such][deep][3][much][power][!]', value: 'Amaze' }
  ],
  expected: {
    wow: {
      such: { deep: deep }
    }
  }
})

cases.push({
  name: 'merge behaviour',
  fields: [
    { key: 'mix', value: 'scalar' },
    { key: 'mix[0]', value: 'array 1' },
    { key: 'mix[2]', value: 'array 2' },
    { key: 'mix[key]', value: 'key key' },
    { key: 'mix[car]', value: 'car key' }
  ],
  expected: {
    mix: {
      '': 'scalar',
      '0': 'array 1',
      '2': 'array 2',
      'key': 'key key',
      'car': 'car key'
    }
  }
})

cases.push({
  name: 'bad fields',
  fields: [
    { key: 'error[good]', value: 'BOOM!' },
    { key: 'error[bad', value: 'BOOM BOOM!' }
  ],
  expected: {
    'error': { good: 'BOOM!' },
    'error[bad': 'BOOM BOOM!'
  }
})

module.exports = cases
