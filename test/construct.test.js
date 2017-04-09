import test from 'ava';

import BemEntityName from '../index';

test('should create object for block', t => {
    const data = { block: 'b' };

    t.deepEqual((new BemEntityName(data)).valueOf(), data);
});

test('should create object for block and elem', t => {
    const data = { block: 'b', elem: 'e' };

    t.deepEqual((new BemEntityName(data)).valueOf(), data);
});

test('should create object for block and mod', t => {
    const data = { block: 'b', mod: { name: 'm', val: 'v' } };

    t.deepEqual((new BemEntityName(data)).valueOf(), data);
});

test('should create object and normalize boolean modifier', t => {
    const entity = new BemEntityName({ block: 'block', mod: { name: 'mod' } });

    t.deepEqual(entity.valueOf(), { block: 'block', mod: { name: 'mod', val: true } });
});

test('should throw error for if entity object is not valid', t => {
    t.throws(
        () => new BemEntityName({ elem: 'elem' }),
        "the object `{ elem: 'elem' }` is not valid BEM entity, the field `block` is undefined"
    );
});

test('should throw error for if mod object is empty', t => {
    t.throws(
        () => new BemEntityName({ block: 'block', mod: {} }),
        "the object `{ block: 'block', mod: {} }` is not valid BEM entity, the field `mod.name` is undefined"
    );
});

test('should throw error for if mod name is undefined', t => {
    t.throws(
        () => new BemEntityName({ block: 'block', mod: { val: 'val' } }),
        "the object `{ block: 'block', mod: { val: 'val' } }` is not valid BEM entity, the field `mod.name` is undefined"
    );
});
