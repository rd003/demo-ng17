import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { PersonService } from "../shared/data-access/person.service";
import { rxState } from "@rx-angular/state";
import { PersonModel } from "../shared/models/person.model";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-people-rx",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <ul>
      @for (person of people$|async; track $index) {
      <li style="list-style: none;">
        {{ person.name }} | {{ person.email }} |
      </li>
      } @empty {
      <div>No items found</div>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleRxComponent {
  private personService = inject(PersonService);
  private state = rxState<{ people: PersonModel[] }>(({ set, connect }) => {
    set({ people: [] });
    connect("people", this.personService.getAll());
  });

  people$ = this.state.select("people");
}
