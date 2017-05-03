import fs from 'fs'
import * as swagger from 'swagger2'
import h from 'handlebars'

let swaggerFile = swagger.loadDocumentSync(__dirname + '/../swagger.yml');

let template = `
{{#each paths as |endpoint path|}}
describe('{{path}}', () => {
  {{#each endpoint as |desc method|}}
  describe('when doing a {{method}} request', async it => {
    let data = await request.{{method}}('{{path}}', {{json desc.parameters.[0].schema.example}})
    it('should reply with the correct data', () => {
      assert.deepEqual({{json desc.responses.default.schema.example}}, data)
    })
  })
  {{/each}}
})

{{/each}}
`

h.registerHelper('json', function(obj, options) {
  return new h.SafeString(
    JSON.stringify(obj || {}, null, 2).split(/\n/g).map((line, i) => i > 0 ? '      ' + line : line).join('\n')
  )
})

let render = h.compile(template)

let out = render(swaggerFile)

console.log(out)
