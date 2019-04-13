export interface AnySpace<T> {
    hasMore(): boolean;
    draw(): T;
}
