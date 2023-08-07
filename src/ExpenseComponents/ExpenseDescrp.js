import Style from './Description.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseData } from '../ReduxStore/ExpenseStore';
import { DeleteExpenseFunction } from '../ReduxStore/ExpenseStore';
import { RedButton, GreenButton, BlueButton } from '../UIComponents/btns';
import Card from '../UIComponents/Card';

function Description() {
    const email = useSelector(state => state.Authecation.email)
    const Details = useSelector(state => state.ExpenseReducer.ExpDetails)
    const ExpDetails = Details[0]
    const Dispatch = useDispatch()

    const EditingHandler = (id) => {
        Dispatch(ExpenseData.EditingHandler(id))
    }

    const DeleteExpenseHandler = (id) => {
        const emailId = { id: id, email: email }
        Dispatch(DeleteExpenseFunction(emailId))
    }

    const unShowExpDetailsHandler = () => {
        Dispatch(ExpenseData.ShowExpenseDetails())
    }

    return (
        <Card>
            <h3 className={Style.Heading}>Expense Deatails</h3>
            <div className={Style.dateAmtContainer}>
                <span>{ExpDetails.Date}</span>
                <span>{ExpDetails.Amount} Rs</span>
            </div>
            <div className={Style.PlaceContainer}>
                <span>Entry Date:</span>
                <span>24 july 2023</span>
            </div>
            <div className={Style.PlaceContainer}>
                <span>Place:</span>
                <span>BMart,Akot</span>
            </div>
            <div className={Style.descContainer}>
                <h4>Description:</h4>
                <span>{ExpDetails.Discription}</span>
            </div>
            <div className={Style.btns}>
                <div>
                    <GreenButton onClickHandler={()=>EditingHandler(ExpDetails.id)}>Edit</GreenButton>
                    <RedButton onClickHandler={() => DeleteExpenseHandler(ExpDetails.id)}>Delete</RedButton>
                </div>
                <BlueButton className={Style.CancelBtn} onClickHandler={() => unShowExpDetailsHandler()}>Cancel</BlueButton>
            </div>
        </Card>
    )
}

export default Description;

