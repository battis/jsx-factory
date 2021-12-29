export default class Fixture {
    static source = { foo: 'hello world', bar: 2, baz: [9, 3, 7] };

    static keySubset = ['foo', 'baz', 'bobble'];

    static verifyExclude(o) {
        expect(o).toStrictEqual({ bar: 2 });
    }

    static verifyInclude(o) {
        expect(o).toStrictEqual({ foo: 'hello world', baz: [9, 3, 7] });
    }

    static transformation(key) {
        return `${key.toUpperCase()}_${key.length}`;
    }

    static verifyTransformation(o) {
        expect(o).toStrictEqual({
            FOO_3: 'hello world',
            BAR_3: 2,
            BAZ_3: [9, 3, 7]
        });
    }
}
