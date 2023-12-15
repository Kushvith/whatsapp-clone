package com.example.api.dto;

import lombok.Data;

@Data
public class UpdateUserReq {
    private String full_name;
    private String profile_picture;
}
