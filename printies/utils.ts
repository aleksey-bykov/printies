export function addClassIf(isIt: boolean, className: string): string {
    return isIt ? ' ' + className : '';
}
