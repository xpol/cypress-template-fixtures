const {resolveVariables} = require('./functions');

describe('resolveVariables()', () => {
    const variables = {
        variable: 'templates',
        reference: 'worked'
    }

    it('replace references with variable values', () => {
        const text = resolveVariables('{{variable}} {{reference}}, {{variable}} {{reference}}', variables)
        expect(text).toEqual('templates worked, templates worked')
    })

    it('allow one space between variable and {{ and variable and }}', () => {
        const text = resolveVariables('{{ variable }} {{ reference }}', variables)
        expect(text).toEqual('templates worked')
    })

    it('disallow more than one space between {{ and }}', () => {
        const text = resolveVariables('{{  variable  }} {{  reference  }}', variables)
        expect(text).toEqual('{{  variable  }} {{  reference  }}')
    })

    it('disallow variables that not match /^[a-zA-Z_]\w+$/', () => {
        const text = resolveVariables('{{ varia#ble }} {{ ^reference }}', variables)
        expect(text).toEqual('{{ varia#ble }} {{ ^reference }}')
    })
})
