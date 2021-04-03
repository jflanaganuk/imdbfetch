import React from "react";
import { BoxOfficeItem, Title } from "../types";
import { Actor, getActorImdbLink } from "./actor";

import "./movie.scss";

export const Movie = (props: BoxOfficeItem & { movie: Title | null }) => {
    if (!props.movie) return null;
    return (
        <>
            <div
                className={"subContainer"}
                style={{ backgroundImage: `url(${props.movie.image})` }}
            />
            <div className={"container"}>
                <h2>{props.movie.title}</h2>
                <div className="horizontal">
                    {props.movie.fullTitle && <p>{props.movie.fullTitle}</p>}
                    {props.movie.originalTitle && (
                        <p>{`-(${props.movie.originalTitle})`}</p>
                    )}
                </div>
                <div className={"imageAndInfo"}>
                    <a
                        href={`https://www.imdb.com/find?q=${getActorImdbLink(
                            props.movie.title
                        )}&ref_=nv_sr_sm`}
                        target="_blank"
                    >
                        <img
                            className="movieImage"
                            src={props.movie.image}
                            onError={(e: any) => (e.target.src = props.image)}
                        />
                    </a>
                    <table>
                        <tbody>
                            <tr>
                                <td>Rank</td>
                                <td>{props.rank}</td>
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{formatDate(props.movie.releaseDate)}</td>
                            </tr>
                            <tr>
                                <td>Weeks in Box Office</td>
                                <td>{props.weeks}</td>
                            </tr>
                            <tr>
                                <td>Opening Weekend</td>
                                <td>{props.weekend}</td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td>{props.movie.genres}</td>
                            </tr>
                            <tr>
                                <td>IMDb Rating</td>
                                <td>
                                    {props.movie.imDbRating
                                        ? `${props.movie.imDbRating}/10`
                                        : "Not Yet Rated"}
                                </td>
                            </tr>
                            <tr>
                                <td>MetaCritic Rating</td>
                                <td>
                                    {props.movie.metacriticRating
                                        ? `${props.movie.metacriticRating}/100`
                                        : "Not Yet Rated"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="plot">{props.movie.plot}</p>
                <div className="trailer">
                    {props.movie.trailer && <video src={props.movie.trailer} />}
                    {!props.movie.trailer && (
                        <p>
                            No trailer? Try clicking{" "}
                            <a
                                href={`https://www.youtube.com/results?search_query=${getActorImdbLink(
                                    props.movie.title
                                )}+trailer`}
                                target="_blank"
                            >
                                here
                            </a>{" "}
                            to search on YouTube!
                        </p>
                    )}
                </div>
                {props.movie.actorList && (
                    <div className="actorList">
                        {props.movie.actorList.map((actor) => {
                            return (
                                <Actor
                                    name={actor.name}
                                    id={actor.id}
                                    image={actor.image}
                                    asCharacter={actor.asCharacter}
                                    key={actor.id}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export function formatDate(input: string): string {
    const date: Date = new Date(input);
    const toLocale = date.toLocaleDateString();
    return toLocale;
}

export function getFullSizeImg(input: string): string {
    const cutString = input.split("@")[0];
    return `${cutString}@.jpg`;
}
