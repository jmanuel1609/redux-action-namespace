import {DefaultAction} from "../../index";
import ComplexAction from "../ComplexAction";



test("checking  Default action object class" , () => {
    const SET_COUNT:DefaultAction = new DefaultAction("count");
    expect( SET_COUNT.type).toBe( "TYPE_SEND");
    expect( SET_COUNT.name).toBe("DefaultAction:count");

    const NonAtt:DefaultAction = new DefaultAction();
    expect( NonAtt.name).toBe("DefaultAction");

    const SET_ID:DefaultAction = new DefaultAction("id", {
        handleError:false
    });
    expect(SET_ID.props.handleError === false);
    class SET_COUNT_PERSON extends DefaultAction {

    }
    const customCountPerson:SET_COUNT_PERSON = new SET_COUNT_PERSON("count");

    expect(customCountPerson.name ).toBe( "SET_COUNT_PERSON:count");
});


test("checking  ComplexAction action object class" , () => {
    const LOAD_USER:ComplexAction = new ComplexAction("loading");
    expect( LOAD_USER.sendType).toBe( "TYPE_SEND");
    expect( LOAD_USER.successType).toBe( "TYPE_SUCCESS");
    expect( LOAD_USER.name).toBe("ComplexAction:loading");
    class LOAD_PERSON extends ComplexAction {}
    const customCountPerson:LOAD_PERSON = new LOAD_PERSON("loading");

    expect(customCountPerson.name ).toBe( "LOAD_PERSON:loading");
})
