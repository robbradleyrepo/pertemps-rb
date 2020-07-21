declare module 'prettysize' {
  export function prettysize(
    size: number,
    nospace?: boolean,
    one?: boolean,
    places?: number,
    numOnly?: boolean
  ): string | number;
}
