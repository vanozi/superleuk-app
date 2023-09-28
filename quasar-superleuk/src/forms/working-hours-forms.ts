import AppButton from 'components/app/AppButton.vue';
import AppInput from 'components/app/AppInput.vue';
import AppDateInput from 'components/app/AppDateInput.vue';
import AppWorkingTimeInput from 'components/app/AppWorkingTimeInput.vue';

import type FormBuilder from './form-builder';
import {Ref} from 'vue';
import {IWorkingHours} from 'stores/workinghours-store';
import z from 'zod';
import {useAccountStore} from 'stores/account-store';
import AppSelect from 'components/app/AppSelect.vue';


export default class WorkingHoursForms {
    builder: FormBuilder;

    constructor(builder: FormBuilder) {
        this.builder = builder;
    }

    addWorkingHoursForm(datesToSelect: Ref<string[]>) {
        const formBuilder = this.builder;
        // Velden die er voor alle medewerker inzitten
        formBuilder.addField({
            component: AppDateInput,
            name: 'date',
            props: {
                value: datesToSelect.value[0],
                name: 'date',
                type: 'date',
                label: 'Datum',
                testId: 'workinghours-date',
                options: datesToSelect,
            },
        })
            .addField({
                component: AppWorkingTimeInput,
                name: 'hours',
                props: {
                    name: 'hours',
                    value: 0,
                    label: 'Uren',
                    testId: 'workinghours-hours',
                },
            })
        // als de medewerker de rol melker heeft dan veld tovoegen om aantal melkbeurten in te vullen
        if (useAccountStore().hasUserRole('melker')) {
            formBuilder.addField({
                component: AppSelect,
                name: 'milkings',
                props: {
                    name: 'milkings',
                    value: 0,
                    options: [0, 1, 2, 3],
                    label: 'Aantal melkbeurten',
                    testId: 'workinghours-milking',
                },
            });
        }
        // veld omschrijving ook voor alle medewerkers
        formBuilder.addField({
            component: AppInput,
            name: 'description',
            props: {
                name: 'description',
                value: '',
                type: 'textarea',
                label: 'Omschrijving',
                testId: 'workinghours-description',
            },
        });
        // Een validator toevoegen voor melkers, die mogen of uren of melkbeurten invullen, maar wel een van beide
        if (useAccountStore().hasUserRole('melker')) {
            formBuilder.addValidator(
                z.object({
                    hours: z
                        .number(),
                    milkings: z
                        .number()
                }).refine(data => data.hours !== 0 || data.milkings !== 0, 'Vul uren of melkbeurten in')
            );
        }
        return formBuilder.build();
    }

    editWorkingHoursForm(workingHoursItem: IWorkingHours) {
        const formBuilder = this.builder;
        formBuilder
            .addField({
                component: AppInput,
                name: 'date',
                attrs: {
                    'value': workingHoursItem.date,
                    'name': 'date',
                    'type': 'text',
                    'label': 'Datum',
                    'testId': 'workinghours-date',
                    'readonly': true,
                }
            })
            .addField({
                component: AppWorkingTimeInput,
                name: 'hours',
                props: {
                    name: 'hours',
                    value: workingHoursItem.hours,
                    label: 'Uren',
                    testId: 'workinghours-hours',
                },
            })
        // als de medewerker de rol melker heeft dan veld tovoegen om aantal melkbeurten in te vullen
        if (useAccountStore().hasUserRole('melker')) {
            formBuilder.addField({
                component: AppSelect,
                name: 'milkings',
                props: {
                    name: 'milkings',
                    options: [0, 1, 2, 3],
                    label: 'Aantal melkbeurten',
                    testId: 'workinghours-milking',
                },
                attrs: {
                    value: workingHoursItem.milkings,
                }
            });
        }
        formBuilder.addField({
            component: AppInput,
            name: 'description',
            attrs: {
                'value': workingHoursItem.description,
                'name': 'description',
                'type': 'textarea',
                'label': 'Omschrijving',
                'testId': 'workinghours-description'
            }
        })
            .addFullData(workingHoursItem)
            .makeFormItemDeletable()
        return formBuilder.build();
    }
}
