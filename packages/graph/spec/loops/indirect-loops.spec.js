'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;

const expect = require('chai').expect;

const BemGraph = require('../../lib').BemGraph;

describe('loops/indirect-loops', () => {
    it('should not throw error if detected unordered indirect loop', () => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            .linkWith({ block: 'B' });

        graph
            .vertex({ block: 'B' })
            .linkWith({ block: 'C' });

        graph
            .vertex({ block: 'C' })
            .linkWith({ block: 'A' });

        expect(() => graph.dependenciesOf({ block: 'A' })).to.not.throw();
    });

    it('should not throw error if detected unordered indirect loop with ordered part', () => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            .linkWith({ block: 'B' });

        graph
            .vertex({ block: 'B' })
            .linkWith({ block: 'C' });

        graph
            .vertex({ block: 'C' })
            .dependsOn({ block: 'A' });

        expect(() => graph.dependenciesOf({ block: 'A' })).to.not.throw();
    });

    it('should throw error if detected ordered indirect loop', () => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            .dependsOn({ block: 'B' });

        graph
            .vertex({ block: 'B' })
            .dependsOn({ block: 'C' });

        graph
            .vertex({ block: 'C' })
            .dependsOn({ block: 'A' });

        expect(() => graph.dependenciesOf({ block: 'A' })).to.throw();

        try {
            graph.dependenciesOf({ block: 'A' });
        } catch (error) {
            expect(error.loop).to.deep.equal([
                { entity: { block: 'A' } },
                { entity: { block: 'B' } },
                { entity: { block: 'C' } },
                { entity: { block: 'A' } }
            ]);
        }
    });
});
