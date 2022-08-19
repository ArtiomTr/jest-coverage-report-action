import { Annotation } from '../../src/annotations/Annotation';
import { onlyChanged } from '../../src/filters/onlyChanged';

const annotations: Annotation[] = [
    {
        start_line: 5,
        end_line: 5,
        start_column: 4,
        end_column: 21,
        path: 'jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
    {
        start_line: 9,
        end_line: 9,
        start_column: 4,
        end_column: 26,
        path: 'jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
    {
        start_line: 11,
        end_line: 11,
        start_column: 4,
        end_column: 24,
        path: 'jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
    {
        start_line: 15,
        end_line: 15,
        start_column: 4,
        end_column: 26,
        path: 'jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
];
const patchContent = `
From 13c48d4f21f92ea950ab47d4761ec8a7422851c6 Mon Sep 17 00:00:00 2001
From: Florent Jaby <florent.jaby@gmail.com>
Date: Tue, 16 Aug 2022 10:52:26 +0200
Subject: Adding subtle fixtures inside a test

---
 jest/examples/typescript/memory.ts | 22 ++++++++++++++++++----
 1 file changed, 18 insertions(+), 4 deletions(-)

diff --git a/jest/examples/typescript/memory.ts b/jest/examples/typescript/memory.ts
index ba11b9eb..14e13857 100644
--- a/jest/examples/typescript/memory.ts
+++ b/jest/examples/typescript/memory.ts
@@ -7,5 +7,5 @@ name: Some commit name
    redoSomeStuff();
    if (untestedCondition) {
-     didUncoverStatement();
+     stillDoUncoverStatement();
    }
    // continue file
@@ -13,4 +13,5 @@ name: add line
    // call this all the time
+   callSomeOtherStuff()
    if (false) thisWasHereBefore()
    return
`;

describe('onlyChanged(annotations, patchContent)', () => {
    it('filters out annotations on unchanged files', () => {
        // Given
        const expected: Annotation[] = [annotations[1]];
        // When
        const actual = onlyChanged(annotations, patchContent);
        // Then
        expect(actual).toEqual(expected);
    });
});
