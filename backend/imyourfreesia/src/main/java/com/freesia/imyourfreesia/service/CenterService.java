package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.centers.Centers;
import com.freesia.imyourfreesia.domain.centers.CentersRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Service
public class CenterService {
    private final CentersRepository centersRepository;

    private static final int FIRST_PAGE_INDEX = 1;
    private static final int LAST_PAGE_INDEX = 16;

    List<Centers> saeilCenterList = new ArrayList<>();
    List<Centers> womanUpCenterList = new ArrayList<>();

    String centerAddress;

    @PostConstruct
    public List<Centers> getSaeilCenterData() throws IOException {

        for (int i = FIRST_PAGE_INDEX; i <= LAST_PAGE_INDEX; i++) {
            final String saeilURL = "https://saeil.mogef.go.kr/hom/info/search.do?page=" + i;

            Connection conn = Jsoup.connect(saeilURL);

            Document document = conn.get();

            Elements centerElements = document.select("table.tableList02 > tbody > tr ");

            for (Element e : centerElements) {
                Centers centers = Centers.builder()
                        .name(e.select("td").get(1).text())
                        .contact(e.select("td").get(2).text())
                        .address(e.select("td").get(3).text())
                        .websiteUrl(e.select("td").get(5).select("a").attr("href"))
                        .build();

                saeilCenterList.add(centers);
            }
        }
        return centersRepository.saveAll(saeilCenterList);
    }

    @PostConstruct
    public List<Centers> getWomanUpCenterData() throws IOException {

        final String womanUpURL = "https://www.seoulwomanup.or.kr/womanup/common/cntnts/selectContents.do?cntnts_id=W0000044";

        Connection conn = Jsoup.connect(womanUpURL);

        Document document = conn.get();

        Elements centerElements = document.select("li.jb_mb > ul > li");

        for (Element e : centerElements) {

            if (e.select("ol > li").get(0).text().substring(6).contains("서울특별시")) {
                centerAddress = e.select("ol > li").get(0).text().substring(6);
            }

            else {
                centerAddress = "서울특별시 " +e.select("ol > li").get(0).text().substring(6);
            }

            Centers centers = Centers.builder()
                    .name(e.select("h4").text())
                    .contact(e.select("ol > li").get(1).text().substring(7))
                    .address(centerAddress)
                    .websiteUrl(e.select("ol > li").get(2).text().substring(7))
                    .build();

            womanUpCenterList.add(centers);
        }

        return centersRepository.saveAll(womanUpCenterList);
    }

}