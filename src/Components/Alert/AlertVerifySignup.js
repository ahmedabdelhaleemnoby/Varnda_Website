import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
export default function AlertSignUp() {
    return (

        <Alert
            severity="info"
            sx={{
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
            }}
        >
            <AlertTitle>تأكيد الحساب: </AlertTitle>
            تم انشاء الحساب بنجاح.
            يرجى الذهاب للايميل و تاكيد الحساب عن طريق الضغط على اللينك المرسل

            <div style={{
                marginTop: '5px'
            }}>
                <Button variant="outlined" style={{ direction: 'ltr' }} href="/" endIcon={<SendIcon />}>
                    الذهاب الى الصفحه الرئيسيه
                </Button>
            </div>
        </Alert>

    );
}