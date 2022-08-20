import parseDiff from 'parse-diff';

import { Annotation } from '../annotations/Annotation';
interface LineIndex {
    [key: string]: number[] | undefined;
}

export function onlyChanged(
    annotations: Annotation[],
    patchContent: string
): Annotation[] {
    const addedLines: LineIndex = indexAddedLines(patchContent);
    return annotations.filter((a) => isInAddedLines(a, addedLines));
}

function isInAddedLines(a: Annotation, addedLines: LineIndex): boolean {
    return [...range(a.start_line, a.end_line)].some((line: number) =>
        addedLines[a.path]?.some((added) => added === line)
    );
}

function indexAddedLines(patchContent: string): LineIndex {
    const patch = parseDiff(patchContent);
    const addedLines: { [key: string]: number[] } = {};
    for (const file of patch) {
        if (file.to) {
            addedLines[file.to] = [];
            for (const chunk of file.chunks) {
                for (const change of chunk.changes) {
                    if (change.type === 'add') {
                        addedLines[file.to].push(change.ln);
                    }
                }
            }
        }
    }
    return addedLines;
}

function* range(start: number, end: number) {
    for (let i = start; i <= end; ++i) {
        yield i;
    }
}
