import Image from "next/image";
import Link from "next/link";
import { StarIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface DataType {
  heading: string;
  heading2: string;
  imgSrc: string;
  name: string;
  students: number;
  classes: number;
  price: number;
  rating: number;
}

const postData: DataType[] = [
  {
    heading: "Full stack modern",
    heading2: "javascript",
    name: "Colt stelle",
    imgSrc: "/images/_courses/courseone.png",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.7,
  },
  {
    heading: "Design system",
    heading2: "with React programme",
    name: "Colt stelle",
    imgSrc: "/images/_courses/coursetwo.png",
    students: 130,
    classes: 12,
    price: 20,
    rating: 4.7,
  },
  {
    heading: "Design Project",
    heading2: "with Figma",
    name: "Colt stelle",
    imgSrc: "/images/_courses/coursethree.png",
    students: 120,
    classes: 12,
    price: 20,
    rating: 4.7,
  },
  {
    heading: "We Launch Delia",
    heading2: "Webflow this Week!",
    name: "Colt stelle",
    imgSrc: "/images/_courses/courseone.png",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.7,
  },
  {
    heading: "We Launch Delia",
    heading2: "Webflow this Week!",
    name: "Colt stelle",
    imgSrc: "/images/courses/coursetwo.png",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.7,
  },
  {
    heading: "We Launch Delia",
    heading2: "Webflow this Week!",
    name: "Colt stelle",
    imgSrc: "/images/courses/coursethree.png",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.7,
  },
];

const Project = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
            Popular projects.
          </h3>
          <Link
            href={"/"}
            className="text-Blueviolet text-lg font-medium space-links"
          >
            Explore projects&nbsp;&gt;&nbsp;
          </Link>
        </div>
        <div className="grid grid-cols-3 justify-center min-h-screen">
          {postData.map((items, i) => (
            <div key={i} className="w-full max-w-xl">
              <div className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses rounded-2xl">
                <div className="relative rounded-3xl">
                  <Image
                    src={items.imgSrc}
                    alt="gaby"
                    width={389}
                    height={262}
                    className="m-auto clipPath"
                  />
                  <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6">
                    <h3 className="text-white uppercase text-center text-sm font-medium">
                      best <br /> seller
                    </h3>
                  </div>
                </div>

                <div className="px-3">
                  <h4 className="text-2xl font-bold pt-6 text-black">
                    {items.heading}
                  </h4>
                  <h4 className="text-2xl font-bold pt-1 text-black">
                    {items.heading2}
                  </h4>

                  <div>
                    <h3 className="text-base font-normal pt-6 opacity-75">
                      {items.name}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center py-6">
                    <div className="flex gap-4">
                      <h3 className="text-red text-22xl font-medium">
                        {items.rating}
                      </h3>
                      <div className="flex">
                        <StarIcon className="h-5 w-5 text-gold" />
                        <StarIcon className="h-5 w-5 text-gold" />
                        <StarIcon className="h-5 w-5 text-gold" />
                        <StarIcon className="h-5 w-5 text-gold" />
                        <StarIcon className="h-5 w-5 text-gold" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-medium">${items.price}</h3>
                    </div>
                  </div>

                  <hr style={{ color: "#C4C4C4" }} />

                  <div className="flex justify-between pt-6 w-full max-w-7xl">
                    <Button
                      leftIcon={
                        <CurrencyDollarIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      }
                      colorScheme="pink"
                      variant="solid"
                      width={"inherit"}
                    >
                      Donate USDC
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;
