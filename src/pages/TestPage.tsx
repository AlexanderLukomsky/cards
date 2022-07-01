import SuperButton from "../Components/common/SuperButton/SuperButton";
import SuperCheckbox from "../Components/common/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../Components/common/SuperInputText/SuperInputText";

export const TestPage = () => (
    <div>
        Test Page
        <br /><br /><br />
        <div><SuperInputText /></div>
        <br /><br /><br />
        <div style={{ display: 'flex', justifyContent: 'center' }}><SuperCheckbox /></div>
        <br /><br /><br />
        <div><SuperButton>button</SuperButton></div>
    </div>
)