import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Calendar, {EventObject, Options} from '@toast-ui/calendar';
import {generateRandomEvents, MOCK_CALENDARS} from '../../calendar-example/mock';

import Chance from 'chance';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {JsonPipe, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatRadioButton} from '@angular/material/radio';
import {MatCheckbox} from '@angular/material/checkbox';

const chance = new Chance();
@Component({
  selector: 'cli-appointement',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    JsonPipe,
    FormsModule,
    MatRadioButton,
    MatCheckbox,
    NgStyle
  ],
  templateUrl: './appointement.component.html',
  styleUrl: './appointement.component.scss'
})
export class AppointementComponent implements OnInit {
  cal: Calendar
  view=[{id:1,name:"day"},{id:2,name:"week"},{id:3,name:"month"}]
  typeSelect= {id:1,name:"day"};
  calendars=MOCK_CALENDARS
  optionsSelect = {
    type: {id:1,name:"day"},
    calendar:null
  }

  ngOnInit(): void {
    const container = document.getElementById('calendar');
    const options: Options = {
      template: {popupEdit: (e: any) => {
          console.log(e);
          return 'Edit';
        }}  ,
      defaultView: 'day',
      useFormPopup: true,
      useDetailPopup: true,
      calendars:MOCK_CALENDARS,
      isReadOnly: false,
      week: {
        taskView: false,
        eventView: ['time'],
        hourStart: 8,
        hourEnd: 18,
      }
    };

    this.cal = new Calendar(container, options);
    //  this.cal. setDate(new Date(2025, 1, 14));
    this.bindInstanceEvents()
    // this.cal.setCalendars([])
    this.cal.clear();
    const randomEvents = generateRandomEvents(
      this.cal.getViewName(),
      this.cal.getDateRangeStart(),
      this.cal.getDateRangeEnd()
    );
    console.log(randomEvents.slice(0, 4))
    this.cal.createEvents(randomEvents.slice(0, 4));

  }

  bindInstanceEvents() {
    this.cal.on({
      clickMoreEventsBtn: (btnInfo: any) => {
        console.log('clickMoreEventsBtn', btnInfo);
      },
      clickEvent: (eventInfo: any) => {
        console.log('clickEvent', eventInfo);
      },
      clickDayName: (dayNameInfo: any) => {
        console.log('clickDayName', dayNameInfo);
      },
      selectDateTime: (dateTimeInfo: any) => {
        console.log('selectDateTime', dateTimeInfo);
      },
      beforeCreateEvent: (event: EventObject) => {

        console.log('beforeCreateEvent', event);
        event.id = chance.guid();
        event.calendarId = chance.integer({min: 1, max: 5}).toString();
        event.isReadOnly = false;
        event.isPrivate = false;
        // event.customStyle = 'maxWidth: 5px';
        event.dueDateClass="tata"
        this.cal.createEvents([event]);
        this.cal.clearGridSelections();
      },
      beforeUpdateEvent: (eventInfo: any) => {
        console.log('beforeUpdateEvent', eventInfo);
        let event, changes;

        console.log('beforeUpdateEvent', eventInfo);

        event = eventInfo.event;
        changes = eventInfo.changes;

        this.cal.updateEvent(event.id, event.calendarId, changes);

      },
      beforeDeleteEvent: (eventInfo: any) => {
        console.log('beforeDeleteEvent', eventInfo);
      },
    });
  }

  changeCalendar() {
    this.cal.changeView(this.optionsSelect.type.name)
  }

  update(checked: boolean, i: number) {

  }
}
