export default function gql(strings: TemplateStringsArray, ...args: string[]) {
    const result: string[] = [strings[0]];

    for (let i = 0; i < args.length; ++i) {
        result.push(args[i], strings[i + 1]);
    }

    return result.join('');
}
