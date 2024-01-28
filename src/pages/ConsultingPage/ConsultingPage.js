import React from 'react'
import ConstultingPackages from '../../components/ConsultingPage/ConstultingPackages'
import image from '../../assets/Hero2Eq2.png'
import ConsultingPackage from '../../components/ConsultingPage/ConsultingPackage'
import ConsultingInfo from '../../components/ConsultingPage/ConsultingInfo'
function ConsultingPage() {
    return (
        <>
            <ConsultingPackage />
            <ConstultingPackages
                img={image}
                packages={1}
                cost={50}
                duration={1}
                list_a="Daily follow-up on whatsApp."
                list_b="One Zoom call per week (4)."
                list_c="Weekly measurements monitoring."
                list_d="Two body composition analysis sessions."
                isReverse={true}
            />
            <ConstultingPackages
                img={image}
                packages={2}
                cost={20}
                duration={1}
                list_a="Initial and end-of-month measurements."
                list_b="One body composition analysis."
                list_c="Weekly measurements monitoring."
                list_d={false}
            />
            <ConsultingInfo/>
        </>
    )
}

export default ConsultingPage