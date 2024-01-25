import Image from 'next/image';
import homeBanner from "@/assets/images/Blue Welcome to School Library Banner 2.svg";
import RouterButton from "@/components/RouterButton";
import Header from "@/layouts/Header";
import React from "react";

const Home = () => {
    return (
        <>
            <Header step={0}/>
            <h1>Khảo sát</h1>
            <h1 className="txt-red">Tính năng Tư vấn</h1>
            <p>
                Đây là khảo sát được triển khai bởi Hanwha Life Vietnam
                nhằm mục tiêu giúp chúng tôi hoàn thiện quy trình tư vấn và cung cấp sản phẩm bảo hiểm phù hợp hơn cho
                khách hàng trong tương lai.
            </p>
            <div className="img-content">
                <Image src={homeBanner} alt={'Home banner'}/>
            </div>
            <p>Khảo sát gồm 3 bước</p>
            <ol className="custom-circle-list">
                <li>Điền <b>thông tin cơ bản </b>(giới tính, ngày sinh, nơi ở)</li>
                <li>Hoàn thiện bảng <b>"Hoạch định tài chính cuộc đời"</b> theo gợi ý</li>
                <li><b>Báo cáo</b> và thông tin tổng quan <b>sản phẩm bảo hiểm phù hợp</b></li>
            </ol>
            <p>Toàn bộ quy trình khảo sát diễn ra trong khoảng 1 phút. Vui lòng bấm "Tiếp tục" để bắt đầu!</p>
            <RouterButton url={'consulting'} text={'Bắt đầu'}/>
        </>
    );
}
export default Home
