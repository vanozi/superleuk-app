import FormBuilder from "src/forms/form-builder";
import AppInput from "components/app/AppInput.vue";
import {IMedewerker} from "stores/admin/medewerkers-store";

export default class ProfileForms {
    builder: FormBuilder;

    constructor(builder: FormBuilder) {
        this.builder = builder;
    }

    makeGeneralInfoForm(medewerker: IMedewerker) {
        const formBuilder = this.builder;
        formBuilder.addField(
            {
                component: AppInput,
                name: 'first_name',
                attrs: {
                    value: medewerker.first_name,
                    label: 'Voornaam',
                    readonly: true
                }
            }
        )
        formBuilder.addField(
            {
                component: AppInput,
                name: 'last_name',
                attrs: {
                    value: medewerker.last_name,
                    label: 'Achternaam',
                    readonly: true
                }
            },
        )
        formBuilder.addField(
            {
                component: AppInput,
                name: 'email',
                attrs: {
                    value: medewerker.email,
                    label: 'Email',
                    type: 'email',
                    readonly: true
                }
            },
        )
        return formBuilder.build();
    }
}
