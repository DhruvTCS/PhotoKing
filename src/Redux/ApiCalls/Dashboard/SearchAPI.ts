import axios from "axios"
import apiCall from "../AuthorizedApi"
import store from "../../Store"
import { clearError, setAlbums, setError, setLoading } from "../../Slice/Dashboard/AlbumSlice"
import { Albums } from "../../../Data/album.dto"
import { Member } from "../../../Data/member.dto"
import { setMember } from "../../Slice/Dashboard/MemberSlice"

export const SearchData = async (keyword: string) => {
    try {
        store.dispatch(setLoading());
        const res = await apiCall({
            method: "GET",
            url: `/project/search-albums/?search=${keyword}`,
        })
        console.log(res);
        let albums: Albums[] = [];
        let members: Member[] = [];
        res.data.forEach((data: any) => {
            console.log(data)
            if (data.type === 'project') {
                let albumData: Albums = {
                    name: data.name,
                    id: data.id,
                    is_locked: data.is_locked,
                    description: data.description,
                    date: data.date,
                    project_code: data.project_code,
                    user: data.user,
                    image: data.image
                };
                albums.push(albumData);
            } else {
                members.push({
                    id: data.id,
                    name: data.name,
                    profile_image: data.profile_image,
                    phone_number: data.phone_number,
                    job_type: data.job_type,
                    country_code: data.country_code
                })
            }
        });

        console.log(albums);
        store.dispatch(setMember(members));
        store.dispatch(setAlbums(albums))
    } catch (error: any) {
        store.dispatch(setError(error.response));
    }
}