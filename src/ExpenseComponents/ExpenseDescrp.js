import Style from './ExpDescrp.module.css'
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../UIComponents/Modal';
import { ExpenseData } from '../ReduxStore/ExpenseStore';

function ExDescription() {
    const Details=useSelector(state=>state.ExpenseReducer.ExpDetails)
    const ExpDetails =Details[0]
    const Dispatch=useDispatch()

    const unShowExpDetailsHandler=()=>{
        console.log("unShowExpDetailsHandler")
        Dispatch(ExpenseData.ShowExpenseDetails())
    }

    return (
        <Modal>
            <div className={Style.Container}>
                <h3>Expense Deatails</h3>
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
                        <button className={Style.EditBtn}>Edit</button>
                        <button className={Style.DeleteBtn}>Delete</button>
                    </div>
                    <button className={Style.CancelBtn} onClick={()=>unShowExpDetailsHandler()}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default ExDescription;