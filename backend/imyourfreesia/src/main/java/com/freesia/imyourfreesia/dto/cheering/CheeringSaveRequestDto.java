package com.freesia.imyourfreesia.dto.cheering;

import com.freesia.imyourfreesia.domain.cheering.Cheering;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CheeringSaveRequestDto {

    @ApiModelProperty(example = "응원 누른 사람")
    private String myEmail;
    @ApiModelProperty(example = "응원 받은 사람")
    private String yourEmail;

    @Builder
    public CheeringSaveRequestDto(String myEmail, String yourEmail){
        this.myEmail = myEmail;
        this.yourEmail = yourEmail;
    }

    public Cheering toEntity(){
        return Cheering.builder()
                .myEmail(myEmail)
                .yourEmail(yourEmail)
                .build();
    }
}
