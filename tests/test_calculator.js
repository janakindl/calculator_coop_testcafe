
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';


fixture `Calculator`
    .page `https://www.cooppank.ee/kodulaen`
    .skipJsErrors();


test('Check if customer can change values', async t => {
    const askAlone = Selector('.loan-tab-switcher-coapplicant').child(0)  // tab "Taotlen yksi"
    const maxIncome = Selector('input[name="monthly_income"]'); 
    const dependantsSelect = Selector('#edit-dependants-number'); 
    const dependantOption = dependantsSelect.find('option'); 
    const existLoans = Selector('input[name="total_blance_existing_loans"]'); 
    const existFinance = Selector('input[name="total_monthly_obligations"]'); 
    const yearsSlider = Selector('input[name="period"]');
    const sliderDefault = '30';
    const slider = Selector('.ui-slider-handle');
    const sliderHandle = Selector('.slide-period');
    const container = Selector('.c-new-subpage-container4');
    const calcResult = Selector('.c-form-field__summary');
    const getLocation = ClientFunction(() => document.location.href.toString());

    await t
    .setTestSpeed(0.8)
    .maximizeWindow()
    .click(askAlone)  // clicks on tab "Taotlen yksi"
    .click(maxIncome)  // clicks on monthly income field
    .selectText(maxIncome)
    .typeText(maxIncome, '10000')  // writes 10000 to be the value
    .click(dependantsSelect)
    .click(dependantOption.withText('4'))  // click on 4
    .expect(dependantsSelect.value).eql('4')
    .click(existLoans)
    .selectText(existLoans)
    .typeText(existLoans, '800')  // change existing loans from zero to ...
    .click(existFinance)
    .selectText(existFinance)
    .typeText(existFinance, '50')  // change existing financial obligations to ...
    .expect(yearsSlider.value).eql(sliderDefault)  // checks default slider value
    .expect(slider.exists).ok()
    .scrollIntoView(container, { offsetX: 1, offsetY: 1 }) // move view
    .drag(sliderHandle, -70, 0)  // drag slider
    .expect(calcResult.exists).ok()
    .click(Selector('.btn-full-width').withText('ESITA TAOTLUS'))
    .expect(getLocation()).contains('laenutaotlusII')
    .debug();
});
