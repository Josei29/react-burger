import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe("<NavigationItems />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it("should render two <NavigationItems /> elements if !isAuth", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("should render three <NavigationItems /> elements if isAuth", () => {
        wrapper = shallow(<NavigationItems isAuth />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("should contain a logout item if isAuth", () => {
        wrapper = shallow(<NavigationItems isAuth />);
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});