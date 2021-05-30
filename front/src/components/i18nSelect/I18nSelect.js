import React from "react";
import {LOCALES} from "../../i18n/locales"


export const I18nSelect = ({setLanguage})=>{
    return(<select
    className="form-select"
    aria-label="Defarult select example"
    onChange={(event)=> setLanguage(event.target.value)}>
        <option value={LOCALES.ENGLISH}>English</option>
        <option selected value={LOCALES.SPANISH}>Spanish</option>
    </select>);
}