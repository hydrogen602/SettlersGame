#
# make 			# compile all ts to js
# make clean	# remove js files
#

SRCS := $(wildcard *.ts)
JSFILES := $(SRCS:%.ts=built/%.js)

.PHONY = all clean run

all: ${SRCS}
	tsc

#all: ${JSFILES}

run:
	@echo "Running localhost page server..."
	@servePage .

%.js: %.ts
	tsc $<

clean:
	@echo "Cleaning up..."
	rm -f built/*.js built/*.js.map