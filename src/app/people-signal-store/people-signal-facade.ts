import { signalState } from "@ngrx/signals";

export class PeopleSignalFacade {
  private state = signalState({
    people: [],
    loading: false,
    error: null,
  });
}
