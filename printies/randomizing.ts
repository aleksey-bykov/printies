import { AnySpace } from "./any-space";
import { Every, Everying } from "./every";


export function* everyRandomized<T>(space: AnySpace<T>): Every<T> {
    while(space.hasMore()) {
        yield space.draw();
    }
}

export function randomizing<T>(space: AnySpace<T>): Everying<T> {
    return new Everying(everyRandomized(space));
}
